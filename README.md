# Dynamically Managing SSO Providers in Next.js, using Environment Variables

A Next.js application demonstrating dynamic Single Sign-On (SSO) provider configuration with NextAuth.js. The project showcases how to implement flexible authentication by configuring SSO providers through environment variables.

## Features
- Environment variable based SSO provider configuration
- NextAuth.js integration

## Prerequisites

Before you begin, ensure you have:
- Node.js v20.18.1, with npm
- Register your app with your SSO Provider (e.g., Google, Auth0)
  - You might need to specify callback URL during app registration
    - NextAuth.js defines callback URL based on SSO provider ID
      - Pattern: `[your_host]/api/auth/callback/[provider_id]`
      - Example, for GitHub, the callback URL is `[your_host]/api/auth/callback/github`
      - For Azure AD, the callback URL is `[your_host]/api/auth/callback/azure-ad`
  - Ensure you have your app credentials such as client_id and client_secret

## Getting Started

1. Clone the repository

2. Install dependencies by running `npm install`

3. Create a `.env.local` file in the root directory or refer to the included `.env.sample` file

## Configure Environment Variables: 
1. `NEXTAUTH_SECRET` Used for encrypting tokens
     - Generate by running `npx auth secret`
2. `NEXTAUTH_URL` Canonical APP URL
3. `NEXT_PUBLIC_SSO_PROVIDERS`: Comma-separated list of SSO provider IDs
   - Example: `azure-ad,github`
   - Ensure the provider ID exactly matches the module file name
     - Example, if NextAuth.js has defined Azure AD provider in module `next-auth/providers/azure-ad`, then provider ID must be `azure-ad`
     - Refer to https://next-auth.js.org/providers/ to determine module file name for your SSO provider
4. Add the provider credentials as environment variables
    - Credentials supported are: `CLIENT_ID`, `CLIENT_SECRET`, `ISSUER`, `TENANT_ID`, `AUTHORIZATION_PARAMS`
    - The credential must be prefixed with the provider ID
      - Example: `AZURE-AD_CLIENT_ID`, `AZURE-AD_CLIENT_SECRET`
    - For `AUTHORIZATION_PARAMS`, use a JSON string
      - Example: `AZURE-AD_AUTHORIZATION_PARAMS='{"resource":"https://graph.microsoft.com"}'`
## Best Practices
- Always specify your environment variables in the build pipeline