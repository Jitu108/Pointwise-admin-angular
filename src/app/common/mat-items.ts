import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';

export function OpenMatSnackBar(snackBar: MatSnackBar, message: string) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'right';
    config.duration = 10000;
    snackBar.open(message, 'close', config);
  }