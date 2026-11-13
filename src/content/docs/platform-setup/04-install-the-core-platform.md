---
title: "Install the core platform"
description: "The install command of the Core Platform Distribution, the values an operator must set, what comes up, and which routes are public or protected."
---

The cluster is ready and the names resolve. Danube Cloud's team now installs the Core Platform Distribution. The installation is one command. The work lies in the values that you pass and in knowing what you are looking at afterwards.

:::note[In this lecture]
- The install command and the few values an operator must set.
- What comes up, including the jobs that prepare the platform.
- Which routes are public and which are protected.
- A first check.
:::

## One command

```sh
helm upgrade --install core-platform \
  oci://ghcr.io/eclipse-cfm/charts/core-platform-distribution \
  --version 0.0.39 \
  --namespace edc-v --create-namespace \
  -f platform-values.yaml \
  --wait --timeout 15m
```

Pin the version. `0.0.39` is the current one at the time of writing. `edc-v` is the namespace that the chart assumes by default.

## The values you must set

A first values file for Danube Cloud is short:

```yaml
global:
  host: danube-cloud.example
  external:
    scheme: https
    port: 443
  debug:
    enabled: false
postgresql:
  persistence:
    enabled: true
edc:
  controlplane:
    dataspaceProfiles:
      advertisedProfile: bike-dataspace
  issuerservice:
    dcpProfile: vc20-bssl/jwt
    did:
      id: "did:web:issuer.bike-dataspace.example:issuer"
```

| Value | Why it matters |
|---|---|
| `global.host` | The platform host. The routes and the identity host derive from it. |
| `global.external` | The address that counterparties see. It goes into every address and identifier that the platform publishes. Read the caution in lecture 3 before you set the scheme. |
| `advertisedProfile` | The profile name at the end of each participant's public protocol address. It must equal the name of the connector profile from lecture 6. With a wrong value every participant publishes an address that answers `404`. |
| `dcpProfile` | The format of the credentials that the issuer creates. |
| `did.id` | Pins the issuer's identifier to the association's domain. Without it the chart derives the identifier from the platform host. |

The last three values belong to the dataspace profile. They are set at installation because the services read them when they start or when a participant is provisioned.

## What comes up

**Services.** The connector, the Identity Hub, the Issuer Service, Siglet, the managers and agents of the Connector Fabric Manager, jwtlet, the service that checks tokens for the gateway, and PostgreSQL, Vault, and NATS.

**Bootstrap jobs.** They create the databases, the message streams, and the content of the secret store that the services expect.

**Seed jobs.** They run as Helm hooks after the installation and put the first objects into the services:

| Seed job for | What it creates |
|---|---|
| jwtlet | The scope definitions and the first token exchange mappings. |
| Issuer Service | The issuer's own context, named `issuer`, with its identifier, its signing key, and the address of its issuing endpoint. |
| Provision Manager | The **provisioning steps**: what happens when a participant is created or removed. |
| Tenant Manager | A **cell**: the deployment target that participants are assigned to. |

:::caution
The seed jobs run again after every upgrade. At the time of writing those of the Tenant Manager and the Provision Manager do not check whether their objects exist, so each upgrade creates another cell and puts the seeded provisioning steps back, which lecture 7 replaces. After the first installation, switch both off with `seedJobs.tenantManagerSeed.enabled` and `seedJobs.provisionManagerSeed.enabled`.
:::

## Public and protected routes

**Public routes** are called by counterparties and by anyone who verifies a credential.

| Route | Served by | For |
|---|---|---|
| `/api/dsp/{participantContextId}/{profile}` | Connector | Dataspace Protocol |
| `/api/credentials/v1/participants/{participantContextId}` | Identity Hub | Presentations and credential delivery |
| `/api/issuance/v1/participants/issuer` | Issuer Service | Credential requests |
| `/statuslist/{id}` | Issuer Service | Revocation lists |
| The paths on the identity host and the issuer host | Identity Hub, Issuer Service | Identity documents |

A counterparty holds no token of your platform. It proves who it is with its own credentials, and each service checks that itself. This is why these routes pass the gateway without a token check.

**Protected routes** are administration: `/api/management` for the connector, `/api/identity` for the Identity Hub, `/api/issuer/admin` for the Issuer Service, `/api/tm` and `/api/pm` for the Connector Fabric Manager, and `/api/siglet` for Siglet. The gateway lets a request through only if it carries a valid token with a scope that fits the route and the method. The token exchange endpoint, `/api/auth/token`, issues these tokens. Lecture 5 explains who can get one.

## A first check

```sh
kubectl -n edc-v get pods,jobs
helm -n edc-v status core-platform
curl https://issuer.bike-dataspace.example/issuer/did.json
```

All pods should be ready and all jobs complete. `helm status` prints the public endpoints and the prefix from which participant identifiers are built. The last command must return the identity document of the issuer, with the identifier that you pinned and the issuing endpoint. An empty document means that the host of the route and the identifier disagree.

You now have a running platform that is empty. It has no credential definitions, no policy terms, and no participants.

## Key takeaways

- One `helm` command installs the platform. Pin the chart version.
- Set the host, the external address, and three values that belong to the dataspace profile: the advertised profile, the credential format, and the issuer's identifier.
- Seed jobs create the first objects. Two of them must not run again on upgrades.
- Protocol endpoints, identity documents, and revocation lists are public. Every administration API is protected by a token check at the gateway.

## Go deeper

- [Core Platform Distribution: README](https://github.com/eclipse-cfm/core-platform-distribution/blob/main/README.md) contains the installation, the configuration overview, and the table of exposed endpoints.
- [Core Platform Distribution: values.yaml](https://github.com/eclipse-cfm/core-platform-distribution/blob/main/values.yaml) documents every value in comments.
- [Helm: Use OCI-based registries](https://helm.sh/docs/topics/registries/) explains installing a chart from a registry.
- [JAD: README](https://github.com/eclipse-dataspace-hub/jad/blob/main/README.md) installs the same chart with override values for a local cluster.
