---
title: "Apply the profile"
description: "How to send the files of a dataspace profile to the services that read them, in a run that can be repeated, verified, and changed later."
---

Danube Cloud's team has a running platform and a directory of profile files. Applying the profile means sending each file to the service that reads it. The team will do this on every installation and after every change, so the run must be safe to repeat.

:::note[In this lecture]
- Which service receives which part of the profile.
- What to do when an object already exists.
- How to package and verify the run.
- How to change a profile later.
:::

## Four services to call

The profile is applied when the platform is up. The seed jobs from lecture 4 have created what the calls rely on: the issuer's context and a cell. Each part of the profile goes to one service, and the four parts are independent of each other. Every call carries a token from the token exchange of lecture 5.

| Service | Object | Call | If it exists |
|---|---|---|---|
| **Issuer Service** | Attestation definition | `POST /api/issuer/admin/participants/issuer/attestations` | `409`. There is no update. |
| | Credential definition | `POST /api/issuer/admin/participants/issuer/credentialdefinitions` | `409`. Update with `PUT` on the same path. |
| **Connector** | Connector profile | `POST /api/management/v5/dataspaceprofiles` | `409`. Update with `PUT` on the same path. |
| | Credential scope | `POST /api/management/v5/dcpscopes` | `409`. Update with `PUT` and the ID in the path. |
| | Policy expression | `POST /api/management/v5/celexpressions` | `409`. Update with `PUT` and the ID in the path. |
| **Tenant Manager** | Provisioning profile | `POST /api/tm/dataspace-profiles` | It gets a generated ID and cannot be updated. |
| | Its deployment to the cell | `POST /api/tm/dataspace-profiles/{id}/deployments` | Deploy once. |
| **Provision Manager** | Provisioning steps | `POST /api/pm/orchestration-definitions` | It replaces the steps of the same type, including the seeded ones. |
| **jwtlet** | Fixed token exchange mappings | Its management API, inside the cluster only | `409`. |

The Tenant Manager and the Provision Manager are the two services of the Connector Fabric Manager. The connector objects and the provisioning profile need an admin scope.

The deployment of the provisioning profile names the profile and the cell. Read the cell ID from `GET /api/tm/cells`.

```json
{
  "profileId": "5b0e4c6e-7a53-4c1e-9d2b-1f6a3e8c2d10",
  "cellId": "c0a8e1f2-5b7d-4c3a-9e21-7f4d2a6b9c10"
}
```

All four parts must be in place before the first participant is provisioned.

## Make the run repeatable

A second run must leave the platform in the same state as the first. Three patterns cover every row of the table.

1. **Create, and update on conflict.** For the connector profile, the scopes, the expressions, and the credential definitions. After a run, the service holds what the files say. Posting the provisioning steps again has the same effect.
2. **Create, and keep on conflict.** For attestation definitions and mappings. If one has to change, delete it and create it again, on purpose.
3. **Look first, and create only if missing.** For the provisioning profile. List the existing ones with `GET /api/tm/dataspace-profiles`, recognize yours by its name, and remember its ID. Provisioning needs it for every participant.

A run that fails must stop and say where.

## A script or a chart

JAD packages its profile as a chart whose jobs send the definitions after the core platform is installed. The alternative is a script in the profile repository that a pipeline runs after every installation and every change. Both work if the files are the only source, the run can be repeated, and a failure stops it. JAD's jobs treat an existing object as done. A platform that lives for years needs the update path.

## Verify

1. **Read it back.** `GET /api/management/v5/dataspaceprofiles/bike-dataspace` returns the profile as the connector holds it.
2. **Test the expressions.** `POST /api/management/v5/celexpressions/test` evaluates an expression against sample input.
3. **Provision a test participant** and let a second one request its catalog. Lecture 11 turns this into a check that you run after every change.

## Change a profile later

| Kind of change | Examples | How to roll it out |
|---|---|---|
| Additive | A new credential type, a new policy term, an additional trusted issuer. | Apply it at any time. Existing offers, contracts, and credentials are not affected. |
| Breaking | A new name for the profile, a new meaning for a term, a new credential format, a credential that moves into the set requested with every request. | Plan it with the association as a migration for all operators and self-hosted participants. |

A new data sharing agreement, or a new version of one, is not a change of the platform at all. It is a new value in a member's credential and in a provider's policy.

Two breaking changes are easy to underestimate. A renamed profile leaves every participant with a protocol address that no longer answers, because the name is part of it. And a credential that is requested with every request must be held by every participant, or those without it are locked out on the day of the change.

## Key takeaways

- Applying a profile is a fixed set of calls to four services: the Issuer Service, the connector, the Connector Fabric Manager, and jwtlet.
- Make the run repeatable: create and update on conflict where an update exists, and look first where it does not.
- Package the run as a chart with jobs or as a script, and keep the files as the only source.
- Additive changes can be applied at any time. Breaking changes are migrations for the whole dataspace.

## Go deeper

- [EDC documentation: Dataspace profiles](https://eclipse-edc.github.io/documentation/for-adopters/control-plane/dataspace-profiles/) describes creating and updating profiles and scopes.
- [EDC documentation: Issuer Service](https://eclipse-edc.github.io/documentation/for-adopters/issuer-service/) lists the administration API for attestation and credential definitions.
- [Connector Fabric Manager: Tenant Manager API](https://github.com/eclipse-cfm/cfm/blob/main/tmanager/docs/openapi.json) is the OpenAPI description of the calls for cells and dataspace profiles.
- [JAD: dataspace profile chart](https://github.com/eclipse-dataspace-hub/jad/tree/main/charts/jad-dataspace-profile) shows a profile packaged as a chart with jobs.
