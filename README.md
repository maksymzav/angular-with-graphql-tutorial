# Angular With GraphQL Tutorial

This tutorial is about how to use **Angular** with **GraphQL**.

You're probably wondering, "What is GraphQL and why is there a tutorial about it?"

Well, you need GraphQL to get some data from an API. But it's different from HTTP.

## What is GraphQL? Introduction for a Beginner

**GraphQL** is like a smart postman for your application. It's a query language for APIs and a runtime for executing those queries with your existing data.

Imagine you have a bunch of friends (data) living in different houses (databases). You want to ask them about their favorite color, but some friends also have pets and you want to know the pets' names too. Instead of going to each house individually and asking each friend separately about their color and their pet (like REST), you send GraphQL.

You tell GraphQL exactly what you want: "Get me the favorite color and pet names from these friends". GraphQL goes to all the houses (databases), gathers all the info, and returns it to you in a single trip, exactly how you asked for it.

This way, you get exactly what you need, nothing more or less, saving unnecessary data transfers. It's efficient and flexible, perfect for complex systems with lots of data stored in different places.

## Let's try it out

#### Step 1: Install a GraphQL client for your computer

I suggest installing the Altair GraphQL client. https://altairgraphql.dev/
Install it on your computer and open it.

#### Step 2: Fork this repository
![screehshot_from_github](images/fork.png)
This creates your own copy of the repository.

#### Step 3: Clone the repository

Open your terminal and run the following command, replacing `{your_github_name}` with your GitHub username:

```bash
git clone https://github.com/{your_github_name}/angular-with-graphql-tutorial.git
```

#### Step 4: Install the dependencies

```bash
cd angular-with-graphql-tutorial
npm install
```

#### Step 5: Start the GraphQL server
In the same terminal, run the following command:
```bash
nx serve api
```

#### Step 6: Play with GraphQL

Open Altair GraphQL client and set the URL to `http://localhost:3000/graphql`. You can now play with the GraphQL queries.
Start from inserting the following query:

```graphql
query GetAllProducts {
  getAllProducts {
    id
    name
    price
  }
}
```

The result should look like this:
![](images/altair-1.png)

Pay attention that graphql returns only the fields you asked for in a query.

Then inspect the right part of the window, it allows you to see the schema of the API.
That means you can see everything that the API can do.
![](images/altair-2.png)
If you don't see this section, click the "Docs" button in the top right corner.
![](images/altair-3.png)

**Queries** allow you to get data from the server.
**Mutations** allow you to change data on the server.

Click on Queries. Here you can see all the queries you can run.

Then try to update the query in the left part of the window to add more information:

```graphql
query GetAllProducts {
  getAllProducts {
    id
    name
    price
    stores {
      id
      name
    }
    seller {
      id
      name
    }
  }
}
```

The result should look like this:
```json
{
  "data": {
    "getAllProducts": [
      {
        "id": 1712682044222,
        "name": "Product 1",
        "price": 100,
        "stores": [
          {
            "id": 1,
            "name": "Store 1"
          },
          {
            "id": 2,
            "name": "Store 2"
          }
        ],
        "seller": {
          "id": 1,
          "name": "Seller 1"
        }
      },
...
```
So when you ask more information, you get more information.
Play with the queries from the right part of the window to see what you can get.

## Simple Angular application

Now let's create a simple Angular application that will display the products. First we'll display the products from an array we'll make manually. After we'll display the data from graphql on it.

#### Step 1: Create a new Angular application

In the terminal, run the following command:

```bash
npx nx generate @nx/angular:app webapp --directory=apps/webapp --style=scss --e2eTestRunner=none --bundler=esbuild --ssr=false --projectNameAndRootFormat=as-provided
```

What does this command do?
- we add `npx` at the beginning to run the command from the `node_modules` folder, so you don't need nx installed on your computer
- if you worked with angular CLI before, you might have been used to `ng` instead of `nx`. `nx` is a tool that extends the angular CLI, so you can use it to generate angular applications, libraries, and more.
- `generate` is a command to generate something
- `@nx/angular:app` is a schematic that generates an angular application
- `webapp` is the name of the application
- `--directory=apps/webapp` is the directory where the application will be generated
- `--style=scss` is the style of the application, if you haven't worked with scss before, you can use `css` instead
- we won't dive deeper into other options, they are here so you don't need to make those choices in the terminal. Because otherwise nx would ask you to specify them.

NX will generate a new Angular application in the `apps/webapp` folder.
You can run the application with the following command:

```bash
nx serve webapp
```

Open your browser and go to `http://localhost:4200/`. You should see the default Angular application.
NX generates some predefined content, but we'll remove it and add our own.

Open in your code editor file `apps/webapp/src/app/app.component.html` and remove `<app-nx-welcome></app-nx-welcome>` from it. The remaining content should look like this:

```html
<router-outlet></router-outlet>
```

#### Step 2: Create a component to display the products

In the terminal, run the following command:

```bash
npx nx generate @schematics/angular:component products --project=webapp
```

This command generates a component named `products` in the `webapp` project.

#### Step 3: Display the products

Open the `apps/webapp/src/app/products/products.component.ts` file and add the following code:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
  ];

}
```

Open the `apps/webapp/src/app/products/products.component.html` file and add the following code:

```html
<h1>Products</h1>
<ul>
  @for (product of products; track product.name) {
  <li>
    {{ product.name }} - {{ product.price }}
  </li>
  }
</ul>
```

#### Step 4: Display the component on the main route

Modify the `apps/webapp/src/app/app.routes.ts` file to load the products component as a homepage:

```typescript
import { Route } from '@angular/router';
import { ProductsComponent } from './products/products.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ProductsComponent
  }
];
```

Open your browser and go to `http://localhost:4200/`. You should see the list of products.
