import { inngest } from "@/inngest/client";
import {serve} from 'inngest/next';

const  {GET,POST,PUT} = serve({
  client: inngest,
  functions: [
    
  ]
})