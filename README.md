This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Folders:

- components: A folder that contains all of the necessary components for the application.
- hooks: A flder containing hooks related to accessing user information and the status of the logged in user.
- src/app: A folder that contains the specific routes and pages of the Next.js application
- utils: A folder containing functions related to getting information from the API


## Setting up ENV variables
This project has private ENV variables that will be required to make this project work. These variables are necessary to connect to the SupaBase database, and actually run the application locally. Below are the steps to setting up these variables.

1. Create a new file .env.local in the root directory
2. Create two new variables:
     - NEXT_PUBLIC_SUPABASE_URL
     - NEXT_PUBLIC_SUPABASE_PUBLIC_KEY
3. Contact project owner for apprival to acccess these variables
     
  

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

This project has already been deployed on Vercel. You can check it out [here](https://equi-pay.vercel.app/)
Simply follow the instructions to set up an account and see how the product works
