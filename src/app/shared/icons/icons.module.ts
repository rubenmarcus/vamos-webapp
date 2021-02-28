import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconAndroidComponent } from './android.icon';
import { IconAppleComponent } from './apple.icon';
import { IconEyeComponent } from './eye.icon';
import { IconKeyComponent } from './key.icon';
import { IconUserComponent } from './user.icon';
import { IconArrowComponent } from '@clicca-webapp/shared/icons/arrow.icon';
import { IconLinkedinComponent } from '@clicca-webapp/shared/icons/linkedin.icon';

const components = [IconAndroidComponent, IconAppleComponent, IconEyeComponent, IconKeyComponent, IconUserComponent, IconArrowComponent,IconLinkedinComponent];


@NgModule({
    declarations: [components],
    imports: [CommonModule],
    exports: [components]
})
export class IconsModule {}
