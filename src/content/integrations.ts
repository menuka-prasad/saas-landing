import { Plug, RefreshCw, Shield } from "lucide-react";

export const integrationContent = {
    title:"Integrates with your favorite tools",
    subtitle:"Connect seamlessly with 100+ popular tools and services. No complex setup required.",

    // DEFAULT: #000 (Black)
    // add custom color for integration icons if need.
    integrations: [
      { name: "Slack", logo: "SiSlack" , color: ""},
      { name: "Google Workspace", logo: "FaGoogle" , color: ""},
      { name: "Microsoft Teams", logo: "FaMicrosoft" , color: ""},
      { name: "Salesforce", logo: "FaSalesforce" , color: ""},
      { name: "HubSpot", logo: "FaHubspot" , color: ""},
      { name: "Stripe", logo: "FaStripe" , color: ""},
      { name: "Shopify", logo: "FaShopify" , color: ""},
      { name: "Mailchimp", logo: "FaMailchimp" , color: ""},
      { name: "Notion", logo: "SiNotion" , color: ""},
      { name: "Zoom", logo: "SiZoom" , color: ""},
      { name: "Figma", logo: "FaFigma" , color: ""},
      { name: "GitHub", logo: "FaGithub" , color: ""},
      { name: "Zapier", logo: "SiZapier" , color: ""},
      { name: "Airtable", logo: "SiAirtable" , color: ""},
      { name: "Dropbox", logo: "FaDropbox" , color: ""},
      { name: "Trello", logo: "FaTrello" , color: ""},
      { name: "Asana", logo: "SiAsana", color: "" },
      { name: "Jira", logo: "FaJira" , color: ""}
    ],
    features:{
      feature1:{
            icon: Plug,
            title: "Easy Setup",
            description: "Connect your tools in minutes with our one-click integrations and guided setup process."
      },
        feature2:{
            icon: RefreshCw,
            title: "Real-time Sync",
            description: "Keep your data synchronized across all platforms with real-time updates and automation."
      },
        feature3:{
            icon: Shield,
            title: "Secure Connection",
            description: "All integrations use enterprise-grade security with OAuth 2.0 and encrypted data transfer."
        }
    },
    bottomCTA:{
        title:"Don't see your tool? We're constantly adding new integrations.",
        viewAllText:"View All Integrations",
        requestText:"Request Integration",
    }
}