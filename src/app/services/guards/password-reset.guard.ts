import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../auth.service";

// @ts-ignore
export const passwordResetGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const queryParams = route.queryParams;
  if (localStorage.getItem("resetting password")) {
    let resetCode = queryParams['reset-code']
    let email = localStorage.getItem("email")
    console.log(resetCode)
    // @ts-ignore
    auth.verifyResetCode(email,resetCode).subscribe(
      () => {
        localStorage.setItem("resetCode",resetCode)
        return true
      },
      (error) => {
        console.log(error)
        router.navigate(['/login']);
      }
    )
  }else {
    router.navigate(['/login']);
  }
};
