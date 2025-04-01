import { hc } from "hono/client";

import { AppType } from "@/server";

export const client = hc<AppType>(process.env.NEXT_PUBLIC_BACKEND_URL!);