import { TestBed } from '@angular/core/testing';
import { AddRequestComponent } from './add-request.component';
describe('AddRequestComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddRequestComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AddRequestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=add-request.component.spec.js.map