---
title: "Prepare the cluster"
description: "What a cluster needs before the platform is installed: a gateway, public names that resolve from outside and from inside, a place for state, and a plan for the development defaults."
---

Danube Cloud's team has a Kubernetes cluster and a chart to install. Most installation problems on this platform do not come from the chart. They come from names that do not resolve, from routes that cannot be reached, and from state that was never meant to survive a restart.

:::note[In this lecture]
- What the cluster has to provide.
- The public names a platform needs, and why they must resolve from two sides.
- Where the platform keeps its state.
- Which defaults are for development only.
:::

## What the cluster provides

- **Kubernetes with the Gateway API** and a gateway controller. At the time of writing the chart is written for Traefik.
- **Helm 3.8 or later**, because the chart is published as an OCI artifact.
- **Access to the image registry** `ghcr.io`, or a mirror.
- **A storage class** for persistent volumes.

## Three kinds of public names

| Name | Example | What it serves |
|---|---|---|
| Platform host | `danube-cloud.example` | All APIs under `/api`: protocol endpoints for counterparties and administration routes. |
| Identity host | `identity.danube-cloud.example` | The identity documents of the hosted participants. |
| Issuer host | `issuer.bike-dataspace.example` | The identity document of the issuer. |

The two extra hosts exist because of how identifiers work. A participant is identified by a DID of the method `did:web`, and such an identifier is an address:

```text
did:web:identity.danube-cloud.example:costa-frames
  resolves to
https://identity.danube-cloud.example/costa-frames/did.json
```

This has three consequences.

1. **An identifier cannot move.** If the host name changes, every participant's identifier changes, and the credentials issued to the old one can no longer be used. Choose names that you can keep for years.
2. **The identity hosts need names of their own.** The Identity Hub finds a document by the exact address of the request, so these routes cannot be rewritten at the gateway.
3. **The issuer's name should belong to the association.** Lecture 8 explains why.

Plan TLS certificates for all three names. The gateway object that the chart creates has a single plain HTTP listener. Terminate TLS in front of it, or switch it off with `security.gateway.enabled` and provide a gateway with HTTPS listeners.

:::caution
At the time of writing the chart sets `edc.iam.did.web.use.https` to `false` in the configuration of the connector, the Identity Hub, and the Issuer Service, and offers no value to change it. This fits a local cluster. A platform that serves identity documents over HTTPS has to change the setting in the rendered configuration, and `global.external.scheme` has to agree with it.
:::

## The names must resolve from inside, too

The services call the same public addresses that they publish. The connector, for example, resolves the issuer's identifier to verify a credential.

Every public name must therefore reach the gateway from outside the cluster and from a pod inside it. On a local cluster this fails quietly: a name under `.localhost` resolves to the pod itself, and the lookup of an identity document finds nothing. The chart's README documents a fix for local clusters and a check to run from a pod:

```sh
kubectl -n edc-v run didcheck --rm -it --restart=Never \
  --image=debian:stable-slim -- getent hosts issuer.bike-dataspace.example
```

The answer must be an address that leads to the gateway. In production you need public DNS records for all three names, and pods must be able to reach the gateway under them. Run the check before you install, and again after every change to DNS or to the gateway.

## State, and the defaults for development

The platform keeps three kinds of state. The chart brings a default for each, and its README says plainly that these defaults are for local and development clusters.

| Kind | What it holds | Default in the chart | A production platform needs |
|---|---|---|---|
| Databases | One database per service. | One PostgreSQL server without a persistent volume. | Persistent, backed-up databases. |
| Secret store | The keys of every participant and of the issuer, and the keys that sign tokens. | Vault in development mode, with a fixed root token in the services' configuration. | A persistent secret store, with access by workload role. |
| Messaging | Events and work queues between the services. | NATS with JetStream, without a persistent volume. | A persistent volume for the streams. |

Two more defaults need attention. The database passwords and other secrets are fixed placeholders, and debug agents are switched on. Set `global.debug.enabled` to `false`, and size the replicas for your load. Some defaults are values that you set. Others are fixed in the chart's templates at the time of writing, for example the database passwords of the services, and need a patched or wrapped chart.

## Key takeaways

- The chart needs the Gateway API with a gateway controller, Helm with OCI support, and a storage class.
- A platform has three kinds of public names. Identifiers contain these names, so they cannot change later.
- Every public name must resolve to the gateway from outside the cluster and from inside it.
- The chart's defaults for secrets, databases, and debugging are for development. Plan their replacements before the installation.

## Go deeper

- [Core Platform Distribution: README](https://github.com/eclipse-cfm/core-platform-distribution/blob/main/README.md) describes the prerequisites, the exposed endpoints, and the DNS requirement of `did:web`.
- [Kubernetes Gateway API](https://gateway-api.sigs.k8s.io/) documents gateways, listeners, and routes.
- [did:web method specification](https://w3c-ccg.github.io/did-method-web/) defines how an identifier maps to the address of its document.
