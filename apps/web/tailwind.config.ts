import type { Config } from "tailwindcss";
import globalConfig from "@sdsc/ui/tailwind.config";

const config: Config ={
    ...globalConfig,
    content: [
        "./app/**/*.tsx"
    ]
}

export default config;