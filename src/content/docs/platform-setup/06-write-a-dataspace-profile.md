---
title: "Write a dataspace profile"
description: "The dataspace profile, as the association publishes it and an operator applies it: a directory under version control, and what the connector, the issuer, provisioning, the installation, and applications each read from it."
---

A dataspace profile comes from the dataspace, not from its operators. The Bike Industry Association owns the profile of the Bike Dataspace and publishes it as files: one issuer, two credentials, three policy terms, the current protocol versions. A platform team at a cloud provider normally does not write a profile. Danube Cloud's team reads the published one, adds the few values that are its own, and applies it.

This lecture shows what such a profile contains, so that you can read one and check it. If your dataspace has its rules only as a document so far, this is the structure to ask the association for, or to draft together with it.

:::note[In this lecture]
- Where a profile comes from, and what an operator adds to it.
- The profile as a directory, with one part per component that reads it.
- The three objects of the connector part.
- The parts for the issuer, for provisioning, for the installation, and for applications.
:::

## One directory, one part per reader

```text
bike-dataspace/
  connector/             profile, credential scopes, policy expressions
  issuer/                attestation and credential definitions
  provisioning/          provisioning profile, provisioning steps, participant settings
  platform-values.yaml   install-time values that depend on the dataspace
  applications/          use cases and the identifiers of their APIs
```

Keep the directory under version control. A profile changes rarely, and every change affects all members. Each part goes to a different service, in the format of that service. Lecture 7 sends them there.

## The connector part

The connector needs three kinds of objects. All of them are JSON documents for its Management API.

**The profile** names the dataspace for the connector.

```json
{
  "@context": ["https://w3id.org/edc/connector/management/v2"],
  "@type": "DataspaceProfile",
  "name": "bike-dataspace",
  "protocol": {
    "version": "2025-1",
    "binding": "HTTPS",
    "namespace": "https://w3id.org/dspace/2025/1/"
  },
  "jsonLdContextsUrl": [
    "https://w3id.org/dspace/2025/1/context.jsonld",
    "https://w3id.org/edc/dspace/v0.0.1"
  ],
  "trustedIssuers": [
    {
      "@id": "did:web:issuer.bike-dataspace.example:issuer",
      "supportedTypes": ["MembershipCredential", "RecyclerCredential"]
    }
  ]
}
```

The `name` becomes the last part of every participant's protocol address, so it must equal the advertised profile from lecture 4. `protocol` selects the version of the Dataspace Protocol. `jsonLdContextsUrl` lists the JSON-LD contexts that the connector uses for messages under this profile. It does not fetch them from the internet by default, so they have to be available to it locally. `trustedIssuers` says whose signature counts, and for which credential types.

**Credential scopes** say which credentials the connector asks a counterparty for.

```json
{
  "@context": ["https://w3id.org/edc/connector/management/v2"],
  "@type": "DcpScope",
  "@id": "bike-recycler",
  "type": "POLICY",
  "value": "org.eclipse.dspace.dcp.vc.type:RecyclerCredential:read",
  "prefixMapping": "https://bike-dataspace.example/policy/Recycler",
  "profile": "bike-dataspace"
}
```

A scope of the type `POLICY` is requested only when a policy uses a term that starts with the prefix. A scope of the type `DEFAULT` is requested with every request. The Bike Dataspace has one of those, in the same shape without a prefix, with the value `org.eclipse.dspace.dcp.vc.type:MembershipCredential:read`.

**Policy expressions** give each policy term a meaning.

```json
{
  "@context": ["https://w3id.org/edc/connector/management/v2"],
  "@type": "CelExpression",
  "@id": "bike-membership",
  "leftOperand": "https://bike-dataspace.example/policy/Membership",
  "expression": "ctx.agent.claims.vc.withType('MembershipCredential').hasClaim('memberOf', 'bike-dataspace')",
  "description": "The counterparty holds a membership credential of the Bike Dataspace",
  "scopes": ["catalog", "contract.negotiation", "transfer.process"]
}
```

When a policy contains the term in `leftOperand`, the connector evaluates the expression against the verified credentials of the counterparty. The expression is written in the Common Expression Language (CEL). Here `scopes` lists the phases in which the term is evaluated. It has nothing to do with credential scopes.

The term `https://bike-dataspace.example/policy/Recycler` has the expression `ctx.agent.claims.vc.hasCredential('RecyclerCredential')`. The term `https://bike-dataspace.example/policy/DataSharingAgreement` checks the value that a policy names, such as `supplier-certificates:1.0`, against the agreements listed in the membership credential:

```text
ctx.agent.claims.vc.withType('MembershipCredential').claims('agreements').exists(a, this.rightOperand in a)
```

:::caution
At the time of writing the EDC documentation marks policy expressions as experimental, and only the multi-participant connector has them. A single-participant connector implements the same term in code.
:::

## The other parts

**Issuer.** One attestation definition and one credential definition per credential type. Lecture 8 shows them.

**Provisioning.** Three things. The first is the **provisioning profile**, the profile as the Connector Fabric Manager sees it: the protocol versions, and a list of credentials for provisioning to request.

```json
{
  "artifacts": [],
  "properties": { "name": "bike-dataspace" },
  "dataspaceSpec": {
    "protocolStack": ["dsp-2025-1", "dcp-2025-1"],
    "credentialSpecs": []
  }
}
```

Danube Cloud leaves `credentialSpecs` empty. Provisioning requests no credentials: a member's Credential Service requests them itself, as lecture 9 shows. The second is therefore a set of **provisioning steps** without the credential steps that the chart seeds. The third is the settings that every participant of this dataspace receives, such as the mapping that puts a recycler's verified activities into access tokens. Lectures 9 and 10 show them.

**Installation.** The values from lecture 4 that depend on the dataspace: the advertised profile, the credential format, and the issuer's identifier. Keep them in a values file inside the profile directory and pass it to `helm` together with your platform values.

**Applications.** The use cases of the dataspace and the identifiers of their APIs. A use case and the version of its data sharing agreement, such as `supplier-certificates:1.0`, also form the value of the agreement term in a policy.

| Use case | API identifiers | Version |
|---|---|---|
| `supplier-certificates` | `https://bike-dataspace.example/api/supplier-certificates/provider`, `https://bike-dataspace.example/api/supplier-certificates/consumer` | `1.0` |
| `battery-passport-data` | `https://bike-dataspace.example/api/battery-data/basic`, `https://bike-dataspace.example/api/battery-data/dismantling` | `1.0` |

Use-case applications read these, not the platform.

## Who owns what

| Content | Decided by | Kept as files by |
|---|---|---|
| Protocol versions, issuer, credential types and format | Bike Industry Association | Every operator and every self-hosted participant |
| Which credential is requested always, and which on demand | Bike Industry Association | The same |
| Policy terms and their expressions | Bike Industry Association | The same |
| Use cases and API identifiers | The owner of each use case | The same, and the application teams |
| Host names, namespaces, service accounts | Each operator | That operator only |

The first four rows must be identical everywhere, which is why they come from the association as files. The last row is yours. Keep the two apart inside the directory.

## Key takeaways

- A dataspace profile is a directory under version control, with one part for each component that reads it.
- The connector part consists of a profile, credential scopes, and policy expressions.
- The provisioning part, the install-time values, and the application identifiers complete the profile.
- The governance authority owns the profile and publishes it. Operators and self-hosted participants apply the same files and add only what is their own.

## Go deeper

- [EDC documentation: Dataspace profiles](https://eclipse-edc.github.io/documentation/for-adopters/control-plane/dataspace-profiles/) describes profiles, credential scopes, and how they are attached to participants.
- [EDC documentation: CEL policy expressions](https://eclipse-edc.github.io/documentation/for-adopters/control-plane/policy-engine/cel/) explains expressions, their evaluation context, and the credential helper functions.
- [JAD: dataspace profile chart](https://github.com/eclipse-dataspace-hub/jad/tree/main/charts/jad-dataspace-profile) is a public example of a profile kept next to a platform installation.
- [Design Trust, Credentials, and Dataspace Profiles: The dataspace profile](../../trust-and-profiles/03-the-dataspace-profile/) covers who owns the profile and how it changes.
- [Design Trust, Credentials, and Dataspace Profiles: Policy vocabulary](../../trust-and-profiles/06-policy-vocabulary/) explains the reasons behind terms and the two kinds of credential scopes.
