# SERVER ACTIONS
async functions that run on the server

# LOADING AND SUSPENSE
- loading is a special file in next.js that allows next.js to use React Suspense feature
Whenever there's some server side component that is awaiting some data and you add loading file it would be 
  equivalent to wrapping the whole component in a <Suspense fallback={Loading...}><SomeAwaitedComponent/></Suspense>

# STREAMING
-You can add a suspense yourself - very useful for example if you want to leverage `STREAMING` in next.js. Lets say 
we dont want to block the entire page when fetching data needed only by a small component within it. We can make 
this component fetching data a server component and fetch data directly within it as close as possible to a place 
where this data will be used.  Data to this component will be streamed in by next when they are ready, but will not 
block rendering or interacting with the page. You can also incorporate your own strategy what you want to do with 
that component while it is being streamed.

# dynamic rendering 
- NO CACHING - PAGE ALWAYS HAS A FRESH ACTUAL DATA - COMPONENT IS RENDERED WHENEVER THSE USER MAKES A REQUEST 

# static rendering
- data fetched during build and only then

# export const dynamic = 'force-dynamic'
- this will make every component in  the current route dynamic
- to do that on the fetch level you can add no-cache option


# Preventing resetting form after submit via form action
By default, after form action form will be reset. But since we can return whatever we want from form action, we can 
pass a form object, and use it's value as a default value to populate the fields again. 
```js
	const [state, formAction, pending] = useActionState(actionTest, initData);
  <Input
        defaultValue={state?.company_name}
        placeholder={'Nazwa firmy / pracowni'}
        name={'company_name'}
  />
  export async function actionTest(prevState: FormT, formData: FormData) {
    if (formData) console.log(formData?.get('company_name'));
    return { company_name: 'test' };
  }
```
