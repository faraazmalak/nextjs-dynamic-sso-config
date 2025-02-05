import { ProviderConfig } from './app/_lib/types'
import { AuthOptions } from 'next-auth'
import { Provider } from 'next-auth/providers/index'

const getProviders = () => {
    try {
        const providers: Provider[] = []
            const providerID = process.env.NEXT_PUBLIC_SSO_PROVIDERS?.split(',') || []
            providerID.forEach(async (id) => {
                const ProviderModule = await import(/* webpackIgnore: true */  `next-auth/providers/${id.toLowerCase()}`)
                const Provider = ProviderModule.default.default

                const tenantID = process.env[`${id.toUpperCase()}_TENANT_ID`]
                const authorizationParams = process.env[`${id.toUpperCase()}_AUTHORIZATION_PARAMS`]
                const clientId = process.env[`${id.toUpperCase()}_CLIENT_ID`]
                const clientSecret = process.env[`${id.toUpperCase()}_CLIENT_SECRET`]
                const issuer = process.env[`${id.toUpperCase()}_ISSUER`]
                if (clientId && clientSecret) {
                    const providerConfig: ProviderConfig = { clientId, clientSecret }
                    if (issuer) {
                        providerConfig['issuer'] = issuer
                    }
                    if (tenantID) {
                        providerConfig['tenantId'] = tenantID
                    }
                    if (authorizationParams) {
                        providerConfig['authorization'] = {
                            params: JSON.parse(String(authorizationParams)),
                        }
                    }
                    providers.push(Provider(providerConfig))
                }
            })
        return providers
    } catch (e) {
        throw new Error(`SSO not configured correctly. Check your environment variables. ${e}`)
    }

}

export const authConfig: AuthOptions = {
    providers: getProviders(),
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token, // This is the raw token
                }
            }
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                accessToken: token.accessToken as string,
            }
        },
    },
}