/* eslint-disable */
/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from "@angular/core";
import { ProxyCmp, proxyOutputs } from "./utils";
import { Components } from "@picpay/lab-components";
export declare interface LabButton extends Components.LabButton {
}
@ProxyCmp({ inputs: ["isEditing", "label", "type"] })
@Component({ selector: "lab-button", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["isEditing", "label", "type"] })
export class LabButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface LabCardButton extends Components.LabCardButton {
}
@ProxyCmp({ inputs: ["avatar", "description", "isEditing", "spotlight", "value"] })
@Component({ selector: "lab-card-button", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["avatar", "description", "isEditing", "spotlight", "value"] })
export class LabCardButton {
  actionButtonClick!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["actionButtonClick"]);
  }
}
export declare interface LabHeader extends Components.LabHeader {
}
@ProxyCmp({ inputs: ["avatar", "banner", "isEditing", "pageTitle"] })
@Component({ selector: "lab-header", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["avatar", "banner", "isEditing", "pageTitle"] })
export class LabHeader {
  backButtonClick!: EventEmitter<CustomEvent>;
  edit!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["backButtonClick", "edit"]);
  }
}
export declare interface LabInput extends Components.LabInput {
}
@ProxyCmp({ inputs: ["inputType", "isEditing", "isEnabled", "label", "maxSize", "text"] })
@Component({ selector: "lab-input", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["inputType", "isEditing", "isEnabled", "label", "maxSize", "text"] })
export class LabInput {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface LabMarkdown extends Components.LabMarkdown {
}
@ProxyCmp({ inputs: ["text"] })
@Component({ selector: "lab-markdown", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["text"] })
export class LabMarkdown {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface LabPopover extends Components.LabPopover {
}
@ProxyCmp({ inputs: ["margin", "offset", "placement", "size", "titleText"] })
@Component({ selector: "lab-popover", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["margin", "offset", "placement", "size", "titleText"] })
export class LabPopover {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface LabSimpleHeader extends Components.LabSimpleHeader {
}
@ProxyCmp({ inputs: ["isEditing", "pageTitle"] })
@Component({ selector: "lab-simple-header", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["isEditing", "pageTitle"] })
export class LabSimpleHeader {
  backButtonClick!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["backButtonClick"]);
  }
}
export declare interface LabTitle extends Components.LabTitle {
}
@ProxyCmp({ inputs: ["isEditing", "text", "type"] })
@Component({ selector: "lab-title", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["isEditing", "text", "type"] })
export class LabTitle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface LabTransformer extends Components.LabTransformer {
}
@ProxyCmp({ inputs: ["component"] })
@Component({ selector: "lab-transformer", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["component"] })
export class LabTransformer {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
