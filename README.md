# AngularContactSpa

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.19.

## Development server

To start a local development server, run:

```bash
ng serve
```
To start a local development server with SSL (https://), run:

```bash
ng serve --ssl --host 127.0.0.1
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Secure Hosting Troubleshooting

The Angular CLI ng serve command defaults to binding the development server to ```127.0.0.1```(```localhost```), which restricts access to the local machine.  To allow access from other devices on the same network, you must run the command with the ```--host 0.0.0.0``` flag (e.g., ```ng serve --host 0.0.0.0```). 

When using ```--host 0.0.0.0```, you may need to add the ```--disable-host-check``` flag to bypass Angular's security host verification, allowing connections via your machine's IP address (e.g., ```192.168.1.x```) instead of ```localhost```.  If you encounter a ```permission denied``` or ```EACCES error on port 4200```, it is often caused by port conflicts or Windows network adapters; restarting the Windows NAT driver (net stop winnat then net start winnat) or killing the conflicting process can resolve this.