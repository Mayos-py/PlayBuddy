import { TestBed } from '@angular/core/testing';
import { PlayerRequestComponent } from './player-request.component';
describe('PlayerRequestComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PlayerRequestComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(PlayerRequestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=player-request.component.spec.js.map