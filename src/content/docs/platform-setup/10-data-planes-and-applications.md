---
title: "Data planes and use-case applications"
description: "What an operator runs and configures so that data can flow: Siglet as the token half of the data plane, and what a hosted use-case application needs from the platform."
---

Costa Frames and Lindner Bikes are provisioned and can negotiate a contract. Moving data is not the connector's job. On Danube Cloud's platform the data plane has two halves: Siglet, which the platform runs for every participant, and an application that serves the data. Costa has no software team, so Danube Cloud also hosts that application, the supplier certificate service, for its members.

:::note[In this lecture]
- What you run and configure for Siglet.
- What a hosted use-case application needs from the platform.
- Why isolation between members is your concern, too.
- Where the operator's part ends.
:::

## Siglet, the platform's half of the data plane

**Siglet** issues an access token for every data flow and revokes it when the flow ends. It never touches data. The application serves the data and accepts a request only with a valid token. The [application path](../../application/09-data-plane-architecture/) explains flows and tokens.

Your part is configuration. Most of it travels in the participant profile of lecture 9.

| Item | What to know |
|---|---|
| Transfer type mapping | Which application endpoint a transfer type leads to. It replaces the defaults of the installation for that participant. |
| Claim mappings | Which verified facts go into a token, as the dataspace profile says. In the Bike Dataspace these are a recycler's activities. A mapping that fails and is not optional fails the whole flow. |
| Signing key | It lives in the secret store. Siglet publishes the public keys at `/api/siglet/keys`. |
| Access to tokens | An application reads and verifies tokens only for the participant context in its own token. |

Provisioning also registers Siglet as the participant's data plane at the connector:

```json
{
  "dataplaneId": "costa-frames-siglet",
  "endpoint": "http://siglet.edc-v.svc.cluster.local:8081/api/v1/costa-frames/dataflows",
  "profiles": ["https://w3id.org/dspace-sig/profile/http-pull"],
  "authorization": {
    "type": "oauth2_token_exchange",
    "tokenExchangeEndpoint": "http://jwtlet.edc-v.svc.cluster.local:8080/token",
    "issuer": "http://jwtlet.edc-v.svc.cluster.local:8080",
    "jwksUri": "http://jwtlet.edc-v.svc.cluster.local:8080/.well-known/jwks.json",
    "resource": "costa-frames",
    "scope": "signaling"
  }
}
```

The `authorization` part makes the connector and Siglet authenticate each signal to the other. Do not register a data plane without it on a shared platform.

:::caution
The list of transfer types is named `profiles` in current versions of the connector and was named `transferTypes` until November 2026. Check which name your versions expect when a registration has no effect.
:::

## What the application needs from you

Danube Cloud runs one instance of the supplier certificate service for all hosted members, with one context per member.

| The application needs | You provide |
|---|---|
| An identity | A service account, and a token exchange mapping for every participant context that it serves. |
| To be reached | A public route, here `https://supplier-certificates.danube-cloud.example`, and that endpoint in every member's transfer type mapping. |
| To check tokens | Access to Siglet's token API for its participant contexts. |
| To learn about changes | An identity on the message broker, with access to the event stream. |
| To keep records | A database of its own. |
| A context per member | A step in the portal's provisioning workflow that creates it after provisioning. |

The chart lets you name service accounts that receive a mapping whenever a participant is provisioned:

```yaml
cfm:
  agents:
    jwtlet:
      clientMappings:
        - name: controlplane
          scopes: [read, signaling]
        - name: identityhub
          scopes: [read]
        - name: siglet-sa
          scopes: [read]
        - name: supplier-certificate-service
          scopes:
            - management-api:assets:write
            - management-api:policies:write
            - management-api:contractdefinitions:write
            - management-api:catalog:read
            - management-api:negotiations:write
            - management-api:transfers:write
            - identity-api:credentials:read
            - siglet-token
```

The first three entries are the chart's defaults. A list that you set replaces them, so you have to repeat them. The last entry is the ceiling for the supplier certificate service.

Counterparties call the application with an access token from Siglet, so its public route passes the gateway without the gateway's token check, and the application verifies every request itself. On the message broker, limit the application's identity to its own consumer of the event stream. The chart's list `postgresql.databases` creates a database and a user for each entry.

## Isolation is your concern, too

The platform services isolate participants by participant context. A hosted application must do the same, and you answer to the members if it does not.

- **Inbound.** Every access token names the provider as its audience. The application uses it to select the member whose data it serves.
- **Outbound.** For each call to the platform the application exchanges a token for one participant context. A token for Costa cannot read Lindner's agreements.
- **Events.** The message broker knows components, not participants. An application that may read the event stream sees the events of all members.

Ask the application team how a request for one member can never return another member's data, and test it with two test participants.

## Where your part ends

Everything inside the application is the application team's work. If the team asks for more than the table above, for example for an administration scope, ask what it is for.

Siglet with an application behind it suits data that is pulled through an API. A participant can also bring a data plane that moves data itself, built with the data plane SDKs for Java, Go, and Rust. A participant context can have several data planes, and the connector chooses one by transfer type.

## Key takeaways

- On this platform Siglet handles the access tokens of data flows, and an application serves the data.
- The participant profile configures Siglet: which endpoint a transfer type leads to and which verified facts go into a token.
- A hosted use-case application needs an identity with a mapping per member, a public route, access to tokens and events, a database, and a context per member.
- Isolation between members inside a hosted application is the application's job and the operator's concern.

## Go deeper

- [Siglet: documentation](https://github.com/eclipse-dataplane-core/siglet/blob/main/docs/siglet.md) covers tokens, transfer type mappings, claim mappings, and deployment.
- [JAD: Service-to-service authentication](https://github.com/eclipse-dataspace-hub/jad/blob/main/docs/token-exchange.md) has a section on bringing a new client application onto the platform.
- [Core Platform Distribution: NATS authentication](https://github.com/eclipse-cfm/core-platform-distribution/blob/main/docs/nats-authentication.md) explains identities on the message broker.
- [Build a Dataspace Application: Data plane architecture](../../application/09-data-plane-architecture/) explains flows, Siglet, and the application as one data plane.
- [Build a Dataspace Application: Flow tokens](../../application/10-flow-tokens/) shows the token from the side of the application.
