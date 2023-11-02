import AuthForm from "../components/AuthForm";

import { json, redirect } from "react-router-dom";

function AuthenticationPage() {
   return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
   const searchParams = new URL(request.url).searchParams;
   const mode = searchParams.get("mode") || "login";

   if (mode !== "login" && mode !== "signup") {
      throw json({ message: "Unstpported mode." }, { status: 422 });
   }
   console.log(mode);

   const data = await request.formData();
   const authData = {
      email: data.get("email"),
      password: data.get("password"),
   };

   const response = fetch("http://localhost:8080/" + mode, {
      method: "POST",
      headers: {
         "Content-type": "application/json",
      },
      body: JSON.stringify(authData),
   });

   if (response.status === 422 || response.status === 401) {
      return response;
   }

   if (!response.ok) {
      throw json(
         { message: "Could not authenticate user!" },
         { status: 500 }
      );
   }

   return redirect("/");
}
