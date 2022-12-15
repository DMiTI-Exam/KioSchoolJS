import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { Edge } from "../model/Edge.js";
import { Globals } from "../utils/Global.js";
import { ApplyButton } from "../gui/ApplyButton.js";
import { NotApplyButton } from "../gui/NotApplyButton.js";

export class SelectEdgeControl extends createjs.Container {
	#edge;
	#yesC;
	#noC;

	constructor(ev) {
		super();
		this.#edge = ev.edgeGetter();

		// to place controls around the edge
		/*this.x = ev.getRightEdgeX2();
		this.y = ev.getRightEdgeY() + ev.rightDeltaY;*/

		// to place the controls in the certain place
		this.x = Globals.SELECT_CONTROLS_X;
		this.y = Globals.SELECT_CONTROLS_Y;

		let self = this;

		this.#yesC = new ApplyButton();
		this.#yesC.x = 0;
		this.#yesC.y = 0;
		this.#yesC.addEventListener("mousedown", function () {
			self.#SelectYes(self);
		});
		this.addChild(this.#yesC);

		this.#noC = new NotApplyButton();
		this.#noC.x = this.#yesC.getBounds().width + 10;
		this.#noC.y = 0;
		this.#noC.addEventListener("mousedown", function () {
			self.#SelectNo(self);
		});
		this.addChild(this.#noC);
	}

	#SelectYes(self) {
		self.#edge.selectedSetter(Edge.SEL_TRUE);
		/*removeChild(_yesC);
		removeChild(_noC);
		_yesC = new ApplyButton();
		_noC = new NotApplyButton();
		addChild(_yesC);
		addChild(_noC);
		_yesC.addEventListener(MouseEvent.MOUSE_DOWN, SelectYes );
		_noC.addEventListener(MouseEvent.MOUSE_DOWN, SelectNo );*/
		ManipulatorManager.instanceGetter().nextClick();
	}

	#SelectNo(self) {
		self.#edge.selectedSetter(Edge.SEL_FALSE);
		ManipulatorManager.instanceGetter().nextClick();
	}
}