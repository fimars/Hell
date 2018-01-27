# GETTING STARTED

## Five Minute Guide

With Now's help, you can deploy and publish any kind of web application (or service) in under five minutes.

This guide will show you how to deploy such an app, connect it to a domain name of your choice and configure an SSL certificate.

Virtualization solution offered by mainstream cloud providers. Here's why:

The biggest departure is immediately obvious to the user. The entire deployment consisted of a single command. You spend no time with complicated, slow and proprietary (locked-in) workflows.

The underlying reason this process is so fast and simple is that you spend no time at all worrying about local tooling, images, registries and caches. As a consequence of that, we're freeing you from the limitations of your local environment and network. The build process belongs in the cloud.

To illustrate this point, pulling, extracting and building the container above took me 3 minutes on a cutting-edge Macbook. Pushing the resulting 200mb image from an office connection in San Francisco, California to Google® Cloud took another 3 minutes.

In the equivalent amount of time, I would be able to push and build the same image to now 18 times. Time that's not spent building is spent on iterating on your product and sharing it with the world.

Over the next few months we'll be rolling out significant enhancements to deepen this vision. While your laptop is constrained by a fixed number of cores, memory, CPU time and bandwidth, the cloud can give you an exponential advantage to you and your business.

### HTML Perview
```html
<div class="color">
</div>
```

### Preparation and Migration
1. Deploy to Now
2. Adding Your Domain
3. Upload SSL Certificates
4. Update DNS Records

### Installing `Now` Desktop

![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)


The __best__ way to get started with Now on your device is Now [Desktop](https://zeit.co/docs), a minimal application that runs in your menubar and comes with the following features:

- Installs Now CLI and keeps it up to datem automatically (the command line interface for interacting with Now).
- Provides a realtime feed of the activity on your account and teams that you've joined.
- Let's you deploy any kind of application or file by simply dragging and dropping it onto its menubar icon or selecting it using a file picker.

## Table

First Header | Second Header | Third Header
------------ | ------------- | ------------
Content from cell 1 | Content from cell 2 | Content from cell 3
Content in the first column | Content in the second column | Content in the third column
Content in the first column | Content in the second column | Content in the third column
Content in the first column | Content in the second column | Content in the third column
Content in the first column | Content in the second column | Content in the third column
Content in the first column | Content in the second column | Content in the third column

## Code Pre

```javascript
const now = require('now')

now('awesome!!!')
```

The best way to get started with Now on your device is Now [Desktop](https://zeit.co/docs), a minimal application that runs in your menubar and comes with the following features:

----------------------

This guide will show `you` how to `deploy` such an app, connect it to a domain name of your choice and configure an SSL certificate.


## Deployment

With now, you can deploy any kind of web app by using a single command. now supports three types of deployments:

- Static - for static web apps
- Node.js - for Node.js apps
- Docker - for all other apps

We have special categories for static and Node.js deployments because they are the most common among the deployments we handle. But you can also use Docker to deploy static and Node.js apps.
Here is how each of these deployments work:

### Static Deployment

> With static deployment, you can deploy a static web app or a set of assets to now. Visit the directory you want to deploy and run this command:

```
$ now
```

If that directory contains an index.html file, that file will be served. Otherwise, now will show all the files in that directory.
