import { TestBed } from '@angular/core/testing';
import { InformationHubComponent } from './information-hub.component';
describe('InformationHubComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InformationHubComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(InformationHubComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=information-hub.component.spec.js.map