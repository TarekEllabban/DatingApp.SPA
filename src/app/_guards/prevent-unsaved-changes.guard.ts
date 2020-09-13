import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent>{
    canDeactivate(memberEditComponent: MemberEditComponent) {
        if (memberEditComponent.editForm.dirty) {
            return confirm('Are you sure you want to leave. Any un-saved changes will be lost');
        }
        return true;
    }
}