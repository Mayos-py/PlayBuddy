import { TestBed } from '@angular/core/testing';
import { ClubsComponent } from './clubs.component';
describe('ClubsComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ClubsComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ClubsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=clubs.component.spec.js.map