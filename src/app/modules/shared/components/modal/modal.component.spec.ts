import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component'; // Replace with the correct path to your component
import { By } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.title).toBe('Modal Title');
    expect(component.sumbitBtnTxt).toBe('Save Changes');
    expect(component.cancelBtnTxt).toBe('Close');
    expect(component.isSubmitBtnDisabled).toBeFalse();
  });

  it('should emit submitBtnClicked when submit method is called', () => {
    spyOn(component.submitBtnClicked, 'emit');

    component.submit();

    expect(component.submitBtnClicked.emit).toHaveBeenCalled();
  });

  it('should emit closeBtnClicked when close method is called', () => {
    spyOn(component.closeBtnClicked, 'emit');

    component.close();

    expect(component.closeBtnClicked.emit).toHaveBeenCalled();
  });

  it('should allow input values to be overridden', () => {
    component.title = 'New Modal Title';
    component.sumbitBtnTxt = 'Submit';
    component.cancelBtnTxt = 'Cancel';
    component.isSubmitBtnDisabled = true;

    fixture.detectChanges();

    expect(component.title).toBe('New Modal Title');
    expect(component.sumbitBtnTxt).toBe('Submit');
    expect(component.cancelBtnTxt).toBe('Cancel');
    expect(component.isSubmitBtnDisabled).toBeTrue();
  });
});
