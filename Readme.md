# TWA boilerplate

If you want to start a new project and have full control under your infrastructure, you can use this boilerplate.

## Quick start

```bash
- git clone git@github.com:twa-dev/boilerplate.git {projectName}
- cd {projectName}
- yarn install
- yarn start
```

## Documentation

This project solves all popular problems you gonna face if you develop TWA.

### Development

`yarn start` starts dev server on 9000 port. It optionally includes ngrok proxy. Ngrok allows you instantly deploy the app
to the internet. It can be useful if you want to see how your application works inside Telegram.

### Build

`yarn build` creates optimized production-ready bundle inside `dist` directory.

### Bundle analyze

`yarn analyze` shows you what your js-bundle consists of. Use this utility if you have performance issues.

### Static analyze

`yarn test:static` runs linters and type check.

If you work in a team it's important to keep consistent code style. Include this command in your CI process to prevent code base incosistency.

## Technologies

Boilerplate uses Webpack, CSS Modules, TypeScript, React, @twa-dev/sdk, @twa-dev/mark42, eslint, stylelint, prettier and ngrok.

All these tools helps you to deliver your value fast and confidently.

### SVG

There are two different ways to import SVG: as a component and as an asset. If you want to use SVG as a component,
you have to add "component." before an extension. Example:

```tsx
import diamond from "./diamond.svg";
import Diamond from "./diamond.component.svg";

<img src="diamond" />
<Diamond />
```

### CSS Modules

All `*.module.css` files are treated as isolated modules. It means that you don't have to worry about class names collisions.
Moreover, css is typed, so it's impossible to use unexisting class names in `.tsx`.

We use named exports for CSS to improve TS checks.

### Ngrok

[Ngrok](https://ngrok.com/) is a powerful tool for creating tunnel between your computer and the internet. It's
already built in `yarn start` command. To enable ngrok you have to create `ngrok.json` in the root of your project.

Example of `ngrok.json`:

```json
{
  "authtoken": "abcd",
  "subdomain": "{subdomain}",
  "region": "{region}"
}
```

**Important:** you have to buy Ngrok subscription if you want to register fixed subdomain names.

Your local website will be available on _https://{subdomain}.{region}.ngrok.io/_.

That's it. All you need to do is to [set](https://core.telegram.org/bots/webapps#launching-web-apps-from-the-menu-button) this URL as Menu Button URL.
