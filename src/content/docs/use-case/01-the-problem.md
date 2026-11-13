---
title: "The problem"
description: "Why sharing supplier certificates across many companies is harder than it looks, and what a better approach would have to provide."
---

Lindner Bikes builds e-bikes. It buys frames, batteries, brakes, and motors from about two hundred suppliers. For each supplier, Lindner needs proof that the company is certified: a quality management certificate, an environmental certificate, sometimes a product safety report. Without valid certificates, Lindner cannot approve a supplier, and its own customers will not approve Lindner.

:::note[In this lecture]
- Why the usual ways of sharing documents between companies stop working at scale.
- Why the difficult part is trust and currency, not file transfer.
- What a better approach must provide.
:::

## How certificates are shared today

Costa Frames is one of Lindner's suppliers. It makes aluminium frames and holds an ISO 9001 certificate that an accredited certification body renews every three years.

When the certificate is renewed, Costa has to get the new version to every customer that needs it. In practice this happens in three ways.

**Email.** Someone at Costa sends the PDF to a contact at each customer. The contact may have changed jobs. The PDF ends up in a mailbox, and nobody knows whether the copy in the customer's files is the current one.

**Supplier portals.** Larger customers run a portal and ask every supplier to upload documents there. Costa supplies thirty customers, so it maintains thirty logins and thirty upload procedures, and repeats the work for every renewal.

**Custom integrations.** A few large partners connect their systems directly. Each connection is a project with its own interface, its own security review, and its own maintenance cost.

Each method works for one relationship. None of them works for thirty customers on one side and two hundred suppliers on the other.

## The real problem is not the file

Moving a PDF from one company to another is easy. The hard questions are different:

- **Is this still the current version?** A certificate can be renewed, restricted, or withdrawn. A copy in a mailbox does not change with it.
- **Who is asking?** When a request for a certificate arrives, Costa needs to know that it comes from a real company with a legitimate reason, and not from a competitor.
- **Who may see what?** A quality certificate can go to any customer. A detailed audit report should not.
- **What was agreed?** If there is a dispute later, both sides need a record of what was shared and under which terms.

Today these questions are answered by people: by phone calls, by trust in a familiar name, by contracts that sit in a folder. That works between two companies that know each other. It does not scale to an industry.

## What a better approach must provide

Suppose the bicycle industry wanted to fix this for everyone at once. A solution would need five properties:

1. **Data stays with its owner.** Costa keeps its certificates in its own systems. There is no central database that holds everybody's documents.
2. **One way to offer and request.** A supplier describes what it offers once, in a common format. Every customer can find and request it the same way.
3. **Verifiable identity.** Every company can prove who it is, and that it belongs to the community, without a phone call.
4. **Explicit terms.** Access rules are stated in a form that software can check, and each exchange is backed by an agreement both sides can refer to.
5. **Current data.** A customer fetches the certificate from the supplier when it needs it, so it always receives the valid version.

A system with these properties is called a **dataspace**. The rest of this path shows how one works.

## Key takeaways

- Document sharing between companies fails at scale because every relationship is handled separately.
- The difficult part is knowing who is asking, what they may see, and whether the data is current.
- A dataspace addresses this with common rules and protocols. It does not collect the data in one place.

## Go deeper

- [IDSA Rulebook: What is a dataspace](https://kb.internationaldataspaces.org/external/rulebook/003_WhatIsADataspace/) gives the formal definition this path builds on.
- [IDSA Rulebook: Guiding principles](https://kb.internationaldataspaces.org/external/rulebook/002_GuidingPrinciples/) explains the principles behind keeping data with its owner.
