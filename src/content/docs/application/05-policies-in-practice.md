---
title: "Policies in practice"
description: "How the connector reads a policy, how access policy and contract policy differ, how an offer refers to the data sharing agreement, and where a condition on an on-demand credential belongs."
---

Costa's offer needs one rule: members only. Brandt Batteries is preparing an offer with two rules. Every member should see that detailed battery data exists, and only recyclers should get a contract for it.

:::note[In this lecture]
- A policy as the connector accepts it.
- Access policy, contract policy, and the term for the data sharing agreement.
- Why a condition on an on-demand credential must not be in the access policy.
- What happens with a term the connector does not know.
:::

## A policy, read slowly

This is the policy definition `bike-recycler` that Brandt creates for its detailed battery data.

```json
{
  "@context": ["https://w3id.org/edc/connector/management/v2"],
  "@type": "PolicyDefinition",
  "@id": "bike-recycler",
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
          },
          {
            "leftOperand": "https://bike-dataspace.example/policy/Recycler",
            "operator": "eq",
            "rightOperand": "active"
          }
        ]
      }
    ]
  }
}
```

The language is ODRL, the Open Digital Rights Language of the W3C. A policy of type `Set` contains permissions. A permission allows an action, here `use`, under constraints, and all of them must hold.

Each constraint names a **term** in `leftOperand`: a condition that the connector checks against the verified credentials of the counterparty. Terms come from the dataspace profile. The Bike Dataspace has three: `Membership` and `Recycler`, each with the value `active`, and `DataSharingAgreement`, which a later section covers. Other dataspaces have other terms, and not every dataspace has one for membership. A term that your application invents is one that no connector can check.

A policy admits a counterparty to an offer. It does not choose documents. Lecture 12 shows where finer decisions are made.

## Access policy and contract policy

A contract definition names two policies, and the connector checks them at different moments.

| | Access policy | Contract policy |
|---|---|---|
| **Checked when** | A counterparty asks for the catalog, and again when it requests a contract | A counterparty requests a contract, and again when it requests a transfer under the agreement |
| **Effect** | Decides whether the offer is visible | Decides who gets a contract. It becomes the policy of the offer and of the agreement. |
| **Costa's supplier certificates API** | `bike-membership` | `bike-membership` |
| **Brandt's dismantling data** | `bike-membership` | `bike-recycler` |

With this setup Lindner sees Brandt's offer for dismantling data and is declined when it asks for a contract. Hansen Recycling gets the contract.

## The data sharing agreement term

A contract for a use-case API covers everything shared under the use case. What the counterparty may do with that data is settled in its data sharing agreement, and the third term lets a provider require a signature.

```json
{
  "leftOperand": "https://bike-dataspace.example/policy/DataSharingAgreement",
  "operator": "eq",
  "rightOperand": "supplier-certificates:1.0"
}
```

The value names the agreement and its version, and the connector looks for it in the counterparty's membership credential. Costa starts with `bike-membership`, as in the use-case path. When it wants only signatories, it creates a policy definition `bike-supplier-certificates-agreement` with both constraints and names it in its contract definition.

A changed policy applies to new catalog requests and negotiations. Existing agreements keep the policy under which they were concluded, and Costa decides whether to end them.

## On-demand credentials and the access policy

Brandt's first idea was to use `bike-recycler` as access policy too, so that only recyclers see the offer. In the Bike Dataspace that hides the offer from everyone, including Hansen. The reason lies in how credentials are presented.

The dataspace profile sorts credentials into two groups. The membership credential is presented **with every request**, and every member holds one. The recycler credential is presented **on demand**: a connector asks for it only when the policy of the request contains a term that needs it.

A catalog request has no policy yet, so it comes with the membership credential only. A constraint on `Recycler` in an access policy can therefore never be met. A constraint on `DataSharingAgreement` can, because it reads the membership credential. A contract request and a transfer request refer to an offer or an agreement, and the recycler credential is asked for there.

Two consequences follow.

1. Put a constraint that needs an on-demand credential in the contract policy, and keep the access policy to what the membership credential can show.
2. If a credential that was asked for is missing, the whole proof fails. Lindner holds no recycler credential, so its contract request for dismantling data ends in a terminated negotiation.

## Terms the connector does not know

The connector validates a policy definition when you create or update it. By default it rejects a definition whose term is bound to no expression, with `400`.

An operator can switch this validation off. A constraint with an unknown term is then dropped before evaluation, and a typing error turns "members only" into "everyone". To rule that out, send a `POST` to `/policydefinitions/{id}/validate` for a stored policy.

## Key takeaways

- Each constraint of a policy names a term from the dataspace profile.
- The access policy controls visibility in the catalog. The contract policy controls who gets a contract.
- The `DataSharingAgreement` term ties an offer to a signed data sharing agreement. It works in both policies.
- A catalog request comes with the membership credential only. Constraints that need an on-demand credential belong in the contract policy.
- An unknown term must never go unnoticed.

## Go deeper

- [EDC documentation: Policy engine](https://eclipse-edc.github.io/documentation/for-adopters/control-plane/policy-engine/) explains how policies are evaluated.
- [EDC documentation: Dataspace profiles](https://eclipse-edc.github.io/documentation/for-adopters/control-plane/dataspace-profiles/) covers credential scopes and policy validation.
- [ODRL Information Model](https://www.w3.org/TR/odrl-model/) defines policies, permissions, and constraints.
- [Design Trust, Credentials, and Dataspace Profiles: Policy vocabulary](../../trust-and-profiles/06-policy-vocabulary/) explains how a dataspace defines its terms and decides which credentials are presented with every request.
