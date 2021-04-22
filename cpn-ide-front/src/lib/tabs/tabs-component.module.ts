// Angular imports
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TabComponent } from "./tabs/tab.component";
import { TabsContainer } from "./tabs-container/tabs.container";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [TabComponent, TabsContainer],
  exports: [TabComponent, TabsContainer],
})
export class TabModule {}
