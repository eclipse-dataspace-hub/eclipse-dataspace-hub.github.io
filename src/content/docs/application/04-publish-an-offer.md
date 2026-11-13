---
title: "Publish an offer"
description: "How an application publishes an API offer through the Management API: one asset per use-case API, a policy definition, and a contract definition, created idempotently."
---

Costa Frames activates the supplier certificate use case in the portal of the supplier certificate service. From that moment Costa's customers should find its certificates in the dataspace. The use-case path described publishing as three steps: describe the data, state the conditions, and make the offer. This lecture shows the same steps as calls to the Management API.

:::note[In this lecture]
- What a contract covers, and the two ways to cut assets.
- The three objects that form an offer.
- How to publish idempotently, and when.
:::

## What a contract covers

A contract in a dataspace is always about data. The asset behind an offer decides how much data one contract covers. The owner of a use case fixes that choice for all its participants.

| | An asset per dataset | An asset per use-case API |
|---|---|---|
| One contract covers | One dataset, such as one certificate. | Everything one company shares with another under the use case, in one direction. |
| Negotiations and transfers | One per dataset and consumer. | One per counterparty and direction. |
| Who gets which item | The policy of each offer decides. | Your application decides. |
| Fits | A few datasets with different conditions. | Many items that change often, and exchanges in both directions. |

A use case can also split its data where the rule for admission differs, as lecture 15 shows.

The Bike Dataspace specifies the second variant for supplier certificates. The supplier certificate service therefore publishes one asset per **use-case API**. The asset stands for all certificates that Costa shares through that API. Which ones a customer gets is decided later, inside the application. What a customer may do with the data is settled in the data sharing agreement of the use case, which lecture 5 ties to a policy term.

## The asset

```http
POST /api/management/v5/participants/costa-frames/assets HTTP/1.1
Host: danube-cloud.example
Authorization: Bearer <access token>
Content-Type: application/json
```

```json
{
  "@context": ["https://w3id.org/edc/connector/management/v2"],
  "@type": "Asset",
  "@id": "supplier-certificates-v1-provider",
  "properties": {
    "name": "Company certificates of Costa Frames",
    "description": "Customers request certificates of Costa Frames and fetch the ones shared with them.",
    "dct:type": { "@id": "https://bike-dataspace.example/api/supplier-certificates" },
    "dct:subject": { "@id": "https://bike-dataspace.example/api/supplier-certificates/provider" },
    "dcat:version": "1.0"
  }
}
```

Three properties are for software. `dct:type` names the API of the use case, `dct:subject` says which of its APIs this asset stands for, and `dcat:version` gives the version. The specification of the use case fixes the values, and every provider uses the same ones. A customer's software finds the offer by subject and version and knows how to talk to the application behind it.

The connector does not interpret these properties. Which ones identify an API is a choice of the dataspace.

`@id` is your own name for the asset. Another provider may use a random value, so nobody should search for it. `name` and `description` are for people who read a catalog.

Publish exactly one asset per API and version for a participant. A customer that finds two cannot tell which to use. A new version gets a second asset with the same subject, and both can stay in the catalog while customers move over.

The asset contains no address of the supplier certificate service. That is configured in the platform, as lecture 9 explains.

## The policy definition

A **policy definition** is a stored policy with an ID. Costa's rule is that any member of the Bike Dataspace may use the API.

```json
{
  "@context": ["https://w3id.org/edc/connector/management/v2"],
  "@type": "PolicyDefinition",
  "@id": "bike-membership",
  "policy": {
    "@type": "Set",
    "permission": [
      {
        "action": "use",
        "constraint": [
          {
            "leftOperand": "https://bike-dataspace.example/policy/Membership",
            "operator": "eq",
            "rightOperand": "active"
          }
        ]
      }
    ]
  }
}
```

Send it with `POST` to `/policydefinitions` of the same participant context. The left operand is a term that the Bike Dataspace defines. Lecture 5 explains how the connector reads the policy.

## The contract definition

A **contract definition** links assets to policies. It turns an asset into an offer.

```json
{
  "@context": ["https://w3id.org/edc/connector/management/v2"],
  "@type": "ContractDefinition",
  "@id": "supplier-certificates-v1-provider",
  "accessPolicyId": "bike-membership",
  "contractPolicyId": "bike-membership",
  "assetsSelector": [
    {
      "@type": "Criterion",
      "operandLeft": "https://w3id.org/edc/v0.0.1/ns/id",
      "operator": "=",
      "operandRight": "supplier-certificates-v1-provider"
    }
  ]
}
```

Send it with `POST` to `/contractdefinitions`. The selector picks the assets, here one asset by its ID. The access policy decides who sees the offer in the catalog, and the contract policy decides who gets a contract. For certificates both are the membership policy.

A consumer that asks Costa for its catalog now receives one dataset with the ID `supplier-certificates-v1-provider`, the three properties, and one offer that carries the contract policy.

## Publish idempotently, at the right moment

Publishing runs more than once: when a member activates the use case, after a deployment, and after a failure. Build it so that a repeated run is harmless.

1. **Use fixed IDs.** The supplier certificate service always creates `supplier-certificates-v1-provider` and `bike-membership`. At the time of writing, IDs are unique per participant context, so every tenant can use the same ones. Older connector versions required IDs to be unique across the whole connector.
2. **Create in order.** Create the asset, then the policy definition, then the contract definition. The contract definition makes the offer visible, so it comes last.
3. **Treat a conflict as a question.** When an object exists already, the connector answers `409`. Read the object back and compare it. If it is equal, the step is done. If it differs, update it.
4. **Record the result.** Store per tenant and use case that the offer is published.

Publish when a use case becomes active for a member, in the Bike Dataspace after it has signed the data sharing agreement. Withdraw the offer when the member leaves the use case, by deleting the contract definition. Existing agreements stay, and lecture 7 covers how to end them.

Each of the three calls needs its own scope: `management-api:assets:write`, `management-api:policies:write`, and `management-api:contractdefinitions:write`.

The supplier certificate service publishes a second asset for every member, `supplier-certificates-v1-consumer`, with the same policy. Its subject is the consumer API of the use case, which lecture 8 explains.

## Key takeaways

- A contract is always about data. The asset decides whether it covers one dataset or everything shared under a use case.
- For a use-case API, publish exactly one asset per API and version, with a policy definition and a contract definition that links them.
- Software finds the asset by the properties that the use case specifies, not by its ID.
- Publishing is idempotent when IDs are fixed and a `409` leads to a comparison.
- Offers follow the activation of a use case for a member.

## Go deeper

- [EDC documentation: Control plane](https://eclipse-edc.github.io/documentation/for-adopters/control-plane/) explains assets, policy definitions, and contract definitions.
- [Management API reference](https://eclipse-edc.github.io/Connector/openapi/management-api/) lists every field of the three objects.
- [A Dataspace Use Case: Publishing an offer](../../use-case/05-publishing-an-offer/) tells the same steps as a story.
- [Design Trust, Credentials, and Dataspace Profiles: Use cases and agreements](../../trust-and-profiles/08-use-cases-and-agreements/) covers who owns a use case and what its participants sign.
