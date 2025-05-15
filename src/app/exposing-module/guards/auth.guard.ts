// import {inject} from "@angular/core";
// import {CanActivateFn, Router, UrlTree} from "@angular/router";
// import {AuthService} from 'oidc-auth-lib';
//
// export const canActivate = (): CanActivateFn => {
//   return () => {
//     return new Promise<boolean | UrlTree>(resolve => {
//       console.debug(`mf-kcusers: Can activate?`);
//       const router = inject(Router);
//       inject(AuthService).isAuthenticated('kcusers', false)
//         .then(value => value ? resolve(true) : resolve(router.createUrlTree(['no-rights'])));
//     });
//   };
// }
