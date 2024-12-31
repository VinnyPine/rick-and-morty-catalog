export default (request: Request) => {
  const url = new URL(request.url);
  const path = url.pathname;
  console.log("🚀 ~ path:", path)

  const isStaticFile = path.match(
    /\.(css|js|mjs|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|map)$/
  );
  const isStaticRoutes = path.match(/^\/(character|episode|@vite\/client)?$/);
  const matchDynamicRoute = path.match(/^\/(character|episode)\/(\d+)$/);

  if (isStaticFile || isStaticRoutes) return;
  console.log("🔥 ~ path:", path)
  if (!matchDynamicRoute) return Response.redirect('/', 301);

  const route = matchDynamicRoute[0];

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/character',
      'Set-Cookie': `dynamicRoute=${route}; Path=/;`,
    },
  });
};

export const config = { path: '/*' };
