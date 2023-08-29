// import { Router } from '@angular/router';
// import { CanActivateFn } from '@angular/router';
// import { ModuleDeterminationService } from '../services/module-determination.service';
// import { AppInjector } from 'src/app/app.module';
// import { DomainService } from '../services/domain.service';
// import { isPlatformServer } from '@angular/common';
// import { PLATFORM_ID } from '@angular/core';
// import { ServerAppInjector } from 'src/app/app.server.module';

// export function dynamicModuleLoaderGuardFactory(router: Router): CanActivateFn {
//   return (route, state) => {
//     const injector = isPlatformServer(PLATFORM_ID)
//       ? ServerAppInjector
//       : AppInjector;

//     const domainService = injector.get(DomainService);
//     const moduleDeterminationService = injector.get(ModuleDeterminationService);

//     const domain = domainService.getDomain();
//     const moduleToLoad = moduleDeterminationService.getModuleForDomain(domain);

//     // Adjust the index based on your actual route's position in the config
//     router.config[0].loadChildren = () => moduleToLoad;

//     return true;
//   };
// }
