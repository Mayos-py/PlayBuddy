import { TestBed } from '@angular/core/testing';
import { WelcompageComponent } from './welcompage.component';
describe('WelcompageComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WelcompageComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(WelcompageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=welcompage.component.spec.js.map