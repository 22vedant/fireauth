import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import SignIn from "./_components/sign-in"
import SignUp from "./_components/sign-up"

export function page() {
    return (
        <div className="flex gap-6 justify-center items-center">
            <Tabs defaultValue="sign-in">
                <TabsList>
                    <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                    <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="sign-in">
                    <SignIn />
                </TabsContent>
                <TabsContent value="sign-up">
                    <SignUp />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default page