---
title: "Flow tokens"
description: "The claims of the access token that protects a data flow, the checks a provider application makes on every call, and how the consuming side handles the token."
---

A call arrives at the supplier certificate service with a bearer token. Everything the service knows about the caller is in that token: which member is being called, who is calling, and under which agreement. The code that reads it has to be right, because it is the only thing between the internet and Costa's certificates.

:::note[In this lecture]
- The claims of a flow token.
- The checks on the providing side, in order.
- How one token selects tenant, caller, and API.
- What the consuming side does with a token.
:::

## What arrives

A **flow token** is the access token that Siglet issues for one data flow. It is a signed JSON Web Token. Decoded, the token of Lindner's flow to Costa's provider API looks like this.

```json
{
  "iss": "siglet-issuer",
  "sub": "did:web:identity.danube-cloud.example:lindner-bikes",
  "aud": "did:web:identity.danube-cloud.example:costa-frames",
  "iat": 1794478200,
  "exp": 1794481800,
  "jti": "5b1f0c9e-7a42-4d6b-9c31-0e8f2a6d4b17",
  "agreementId": "b7d4e2a1-93c6-4f0b-8a5e-2c1d7f6e9b30",
  "participantId": "did:web:identity.danube-cloud.example:costa-frames",
  "counterPartyId": "did:web:identity.danube-cloud.example:lindner-bikes",
  "datasetId": "supplier-certificates-v1-provider"
}
```

| Claim | Meaning |
|---|---|
| `iss` | The issuer name that the operator configured for Siglet. The platform chart sets `siglet-issuer`. |
| `sub` | The caller: the DID of the counterparty that holds the agreement |
| `aud` | The participant that is being called: your tenant's DID |
| `iat`, `exp` | Issue and expiry time. The default lifetime is one hour. |
| `jti` | A unique ID of the token, used for revocation |
| `agreementId` | The contract agreement behind the flow |
| `participantId`, `counterPartyId` | The two parties of the flow, as the connector reported them |
| `datasetId` | The asset that the agreement covers |

The operator can configure further claims that are computed from the flow. Lecture 13 uses one that comes from a credential.

## The checks on the providing side

Run these checks on every call, in this order.

1. **Signature and issuer.** Verify the token against the public keys of your platform's Siglet, and check that `iss` is its issuer name. Siglet publishes the keys as a key set at `/api/siglet/keys`, without authentication. Tokens are signed with EdDSA. Cache the key set, and fetch it again when a token names a key ID you do not know.
2. **Audience.** `aud` must be the DID of one of your tenants.
3. **Time.** The token must not be expired.
4. **Dataset.** `datasetId` must be an asset that your application published for that tenant.
5. **Revocation.** Decide whether this call needs to know that the flow still exists.

The fifth check needs an explanation. A check against the public keys happens inside your application and costs no network call. It cannot see that a transfer was terminated a minute ago. The token of a terminated flow stays cryptographically valid until it expires.

Siglet offers a second way. Send the token to its verify call, and Siglet checks the signature and also looks the token up in its store.

```http
POST /api/siglet/tokens/verify HTTP/1.1
Host: danube-cloud.example
Authorization: Bearer <access token for costa-frames>
Content-Type: application/json
```

```json
{
  "token": "eyJhbGciOiJFZERTQSIs…",
  "audience": "did:web:identity.danube-cloud.example:costa-frames"
}
```

The answer is `200` with the claims, or `401` for a token that is invalid, expired, or revoked.

| | Local check with the key set | Verify call |
|---|---|---|
| **Sees a terminated flow** | Only when the token expires | Immediately |
| **Use it for** | Frequent, low-risk reads | Writes, documents, and anything sensitive |

The Siglet documentation recommends the local check as the default and the verify call where revocation must take effect at once.

## Tenant, caller, and API from one token

After the checks, three claims drive everything else.

- `aud` selects the **tenant**. In a multi-tenant application this is the only acceptable source. Never take the tenant from a path, a header, or a body that the caller controls.
- `sub` is the **caller**. It is the key for the decisions in lecture 12.
- `datasetId` selects the **API**. A token for the consumer API must not open a route of the provider API.

Record `agreementId` with every call. It links the call to the contract that allowed it.

## The consuming side

When your application calls a counterparty, it presents a token that it did not create.

1. Ask the Siglet token API for the token of the flow, with a token for your own participant context. Ask your operator which scope that call needs. It has changed between platform versions.
2. Keep the flow token in memory and reuse it for further calls.
3. When a call is rejected with `401`, ask Siglet once more. Siglet renews an expired token with the provider's side.
4. If the call is rejected again, or Siglet has no token for the flow, the flow is gone. Mark the channel stale.

Never write a flow token to a log or a database, and never pass it to another system.

## Key takeaways

- A flow token names the tenant in `aud`, the caller in `sub`, the agreement, and the dataset.
- Check signature, issuer, audience, expiry, and dataset on every call.
- A local check does not see a terminated flow. Use Siglet's verify call where that matters.
- The tenant comes from the token and from nowhere else.
- On the consuming side, reuse the token, ask Siglet again after a `401`, and never store or forward it.

## Go deeper

- [Siglet documentation](https://github.com/eclipse-dataplane-core/siglet/blob/main/docs/siglet.md) describes the token shape, both ways of verification, and the token API.
- [RFC 7519: JSON Web Token](https://www.rfc-editor.org/rfc/rfc7519) defines the registered claims.
- [Set Up a Dataspace Platform: Data planes and use-case applications](../../platform-setup/10-data-planes-and-applications/) shows how an operator runs Siglet and configures claims.
