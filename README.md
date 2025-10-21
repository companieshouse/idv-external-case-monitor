# idv-external-case-monitor

## Overview

idv-external-case-monitor is a service designed to automate the monitoring and progression of external identity verification cases. Built for extensibility and reliability, it integrates with third-party APIs and internal systems to streamline identity verification workflows.

## Purpose

This service automates daily polling and status updates for identity verification cases, reducing manual intervention and ensuring timely notifications to users. It is implemented as a set of AWS Lambda functions using Node.js and TypeScript (ESM).

## Features

- **Automated Daily Polling:**
  - Polls the `identity-verification-api` daily to retrieve backlog cases.
  - Scheduling is configurable to minimize third-party API impact.
- **Case Status Management:**
  - Queries TransUnion (TU) ID Mission Document API for each case's status (verified, failed, expired, pending).
  - Updates cases based on status:
    - **Verified:** Creates a verification record, maps TU data, and closes the backlog case.
    - **Failed/Expired:** Removes the case and notifies the user via GOV.UK Notify.
    - **Pending:** Leaves the case open for future polling.
- **Notification Handling:**
  - All notifications are sent via the `identity-verification-api` (integrated with GOV.UK Notify).
- **Extensible & Cloud-Native:**
  - Runs as AWS Lambda functions, triggered by AWS EventBridge.
  - Infrastructure managed with Terraform.

## Architecture

- **APIs Used:**
  - `identity-verification-api`: Backlog management, verification record creation, notifications
  - TransUnion `/v4/customer/get-processed-data`: Case status queries
- **Deployment:**
  - AWS Lambda (Node.js, TypeScript ESM)
  - Scheduled via AWS EventBridge

## Getting Started

### Prerequisites
- Node.js (v24 recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Local Development & Testing

- Run tests:
  ```bash
  npm test
  ```
- Build the project:
  ```bash
  npm run build
  ```
  
## Further Information

- [Architecture View](https://companieshouse.atlassian.net/wiki/spaces/~7120204e84cbf1c489428f9a5d93a92d9df21c/pages/5428674699/IDV+Alternate+Routes+Product+Route+Design+Proposal#New-Service---TU-Verification-Adapter-Service)
- [API Specification](https://github.com/companieshouse/private.api.ch.gov.uk-specifications/blob/master/src/main/resources/verification/identity-verification.yml)

---
