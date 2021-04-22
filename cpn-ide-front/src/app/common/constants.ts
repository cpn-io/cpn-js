import { SplitSizes } from "./model";

export class Constants {
  C1: 1;
}

export const DataTypes = {
  monitor: "monitor",
  monitorblock: "monitorblock",
  ml: "ml",
};

export function getDefaultSplitSizes(): SplitSizes {
  const defaultSplitSize: SplitSizes = new SplitSizes();
  defaultSplitSize.row_main = { name: "row_main", size: [25, 55, 20] };
  defaultSplitSize.column_1 = { name: "column_1", size: [50, 50] };
  defaultSplitSize.column_2 = { name: "column_2", size: [70, 30] };
  return defaultSplitSize;
}

export function getExpandedSplitSizes(): SplitSizes {
  const defaultSplitSize: SplitSizes = getDefaultSplitSizes();
  defaultSplitSize.row_main.size = [0, 100, 0];
  defaultSplitSize.column_2.size = [100, 0];
  return defaultSplitSize;
}
