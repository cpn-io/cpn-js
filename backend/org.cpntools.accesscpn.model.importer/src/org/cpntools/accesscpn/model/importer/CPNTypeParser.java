/************************************************************************/
/* Access/CPN                                                           */
/* Copyright 2010-2011 AIS Group, Eindhoven University of Technology    */
/*                                                                      */
/* This library is free software; you can redistribute it and/or        */
/* modify it under the terms of the GNU Lesser General Public           */
/* License as published by the Free Software Foundation; either         */
/* version 2.1 of the License, or (at your option) any later version.   */
/*                                                                      */
/* This library is distributed in the hope that it will be useful,      */
/* but WITHOUT ANY WARRANTY; without even the implied warranty of       */
/* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU    */
/* Lesser General Public License for more details.                      */
/*                                                                      */
/* You should have received a copy of the GNU Lesser General Public     */
/* License along with this library; if not, write to the Free Software  */
/* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,           */
/* MA  02110-1301  USA                                                  */
/************************************************************************/
package org.cpntools.accesscpn.model.importer;

import org.cpntools.accesscpn.model.cpntypes.CPNAlias;
import org.cpntools.accesscpn.model.cpntypes.CPNBool;
import org.cpntools.accesscpn.model.cpntypes.CPNEnum;
import org.cpntools.accesscpn.model.cpntypes.CPNIndex;
import org.cpntools.accesscpn.model.cpntypes.CPNInt;
import org.cpntools.accesscpn.model.cpntypes.CPNIntInf;
import org.cpntools.accesscpn.model.cpntypes.CPNList;
import org.cpntools.accesscpn.model.cpntypes.CPNProduct;
import org.cpntools.accesscpn.model.cpntypes.CPNReal;
import org.cpntools.accesscpn.model.cpntypes.CPNRecord;
import org.cpntools.accesscpn.model.cpntypes.CPNString;
import org.cpntools.accesscpn.model.cpntypes.CPNSubset;
import org.cpntools.accesscpn.model.cpntypes.CPNTime;
import org.cpntools.accesscpn.model.cpntypes.CPNType;
import org.cpntools.accesscpn.model.cpntypes.CPNUnion;
import org.cpntools.accesscpn.model.cpntypes.CPNUnit;
import org.cpntools.accesscpn.model.cpntypes.CpntypesFactory;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 * @author mw
 */
public class CPNTypeParser {

	/**
	 * 
	 */
	public static final String andNode = "and";

	/**
	 * 
	 */
	public static final String byNode = "by";
	/**
	 * 
	 */
	public static final String idNode = "id";

	/**
	 * 
	 */
	public static final String mlNode = "ml";
	/**
	 * 
	 */
	public static final String recordfieldNode = "recordfield";
	private static final CpntypesFactory typeFactory = CpntypesFactory.INSTANCE;
	/**
	 * 
	 */
	public static final String typeNode = "type";
	/**
	 * 
	 */
	public static final String unionfieldNode = "unionfield";
	/**
	 * 
	 */
	public static final String withNode = "with";

	/**
	 * @param n
	 *            node
	 * @return type
	 */
	public static CPNType processAlias(final Node n) {
		final CPNAlias aliasType = CPNTypeParser.typeFactory.createCPNAlias();

		final NodeList nl = n.getChildNodes();
		for (int i = 0, cnt = nl.getLength(); i < cnt; i++) {
			final Node currentNode = nl.item(i);
			if (ParserUtil.isElementNodeOfType(currentNode, CPNTypeParser.idNode)) {
				aliasType.setSort(ParserUtil.getTextFromElement(currentNode));
			}
		}

		return aliasType;
	}

	/**
	 * @param n
	 *            node
	 * @return type
	 */
	public static CPNType processBool(final Node n) {
		final CPNBool bool = CPNTypeParser.typeFactory.createCPNBool();

		final NodeList nl = n.getChildNodes();
		for (int i = 0, cnt = nl.getLength(); i < cnt; i++) {
			final Node currentNode = nl.item(i);
			if (ParserUtil.isElementNodeOfType(currentNode, CPNTypeParser.withNode)) {
				final NodeList withNl = currentNode.getChildNodes();
				boolean firstId = true;
				for (int j = 0, withCnt = withNl.getLength(); j < withCnt; j++) {
					final Node withCurrentNode = withNl.item(j);
					if (ParserUtil.isElementNodeOfType(withCurrentNode, CPNTypeParser.idNode)) {
						if (firstId) {
							bool.setFalseValue(ParserUtil.getTextFromElement(withCurrentNode));
							firstId = false;
						} else {
							bool.setTrueValue(ParserUtil.getTextFromElement(withCurrentNode));
						}
					}
				}
			}
		}

		return bool;
	}

	/**
	 * @param n
	 *            node
	 * @return type
	 */
	public static CPNType processEnum(final Node n) {
		final CPNEnum enumType = CPNTypeParser.typeFactory.createCPNEnum();

		final NodeList nl = n.getChildNodes();
		for (int i = 0, cnt = nl.getLength(); i < cnt; i++) {
			final Node currentNode = nl.item(i);
			if (ParserUtil.isElementNodeOfType(currentNode, CPNTypeParser.idNode)) {
				enumType.addValue(ParserUtil.getTextFromElement(currentNode));
			}
		}

		return enumType;
	}

	/**
	 * @param n
	 *            node
	 * @return type
	 */
	public static CPNType processIndex(final Node n) {
		final CPNIndex indexType = CPNTypeParser.typeFactory.createCPNIndex();

		final NodeList nl = n.getChildNodes();
		boolean firstValue = true;
		for (int i = 0, cnt = nl.getLength(); i < cnt; i++) {
			final Node currentNode = nl.item(i);
			if (ParserUtil.isElementNodeOfType(currentNode, CPNTypeParser.mlNode)) {
				if (firstValue) {
					indexType.setLow(ParserUtil.getTextFromElement(currentNode));
					firstValue = false;
				} else {
					indexType.setHigh(ParserUtil.getTextFromElement(currentNode));
				}
			} else if (ParserUtil.isElementNodeOfType(currentNode, CPNTypeParser.idNode)) {
				indexType.setName(ParserUtil.getTextFromElement(currentNode));
			}
		}

		return indexType;
	}

	/**
	 * @param n
	 *            node
	 * @return type
	 */
	public static CPNType processInt(final Node n) {
		final CPNInt intType = CPNTypeParser.typeFactory.createCPNInt();

		final NodeList nl = n.getChildNodes();
		for (int i = 0, cnt = nl.getLength(); i < cnt; i++) {
			final Node currentNode = nl.item(i);
			if (ParserUtil.isElementNodeOfType(currentNode, CPNTypeParser.withNode)) {
				final NodeList withNl = currentNode.getChildNodes();
				boolean firstValue = true;
				for (int j = 0, withCnt = withNl.getLength(); j < withCnt; j++) {
					final Node withCurrentNode = withNl.item(j);
					if (ParserUtil.isElementNodeOfType(withCurrentNode, CPNTypeParser.mlNode)) {
						if (firstValue) {
							intType.setLow(ParserUtil.getTextFromElement(withCurrentNode));
							firstValue = false;
						} else {
							intType.setHigh(ParserUtil.getTextFromElement(withCurrentNode));
						}
					}
				}
			}
		}

		return intType;
	}

	/**
	 * @param n
	 * @return
	 */
	public static CPNType processReal(final Node n) {
		final CPNReal realType = CPNTypeParser.typeFactory.createCPNReal();

		final NodeList nl = n.getChildNodes();
		for (int i = 0, cnt = nl.getLength(); i < cnt; i++) {
			final Node currentNode = nl.item(i);
			if (ParserUtil.isElementNodeOfType(currentNode, CPNTypeParser.withNode)) {
				final NodeList withNl = currentNode.getChildNodes();
				boolean firstValue = true;
				for (int j = 0, withCnt = withNl.getLength(); j < withCnt; j++) {
					final Node withCurrentNode = withNl.item(j);
					if (ParserUtil.isElementNodeOfType(withCurrentNode, CPNTypeParser.mlNode)) {
						if (firstValue) {
							realType.setLow(ParserUtil.getTextFromElement(withCurrentNode));
							firstValue = false;
						} else {
							realType.setHigh(ParserUtil.getTextFromElement(withCurrentNode));
						}
					}
				}
			}
		}

		return realType;
	}

	/**
	 * @param n
	 * @return
	 */
	public static CPNType processIntInf(final Node n) {
		final CPNIntInf realType = CPNTypeParser.typeFactory.createCPNIntInf();

		final NodeList nl = n.getChildNodes();
		for (int i = 0, cnt = nl.getLength(); i < cnt; i++) {
			final Node currentNode = nl.item(i);
			if (ParserUtil.isElementNodeOfType(currentNode, CPNTypeParser.withNode)) {
				final NodeList withNl = currentNode.getChildNodes();
				boolean firstValue = true;
				for (int j = 0, withCnt = withNl.getLength(); j < withCnt; j++) {
					final Node withCurrentNode = withNl.item(j);
					if (ParserUtil.isElementNodeOfType(withCurrentNode, CPNTypeParser.mlNode)) {
						if (firstValue) {
							realType.setLow(ParserUtil.getTextFromElement(withCurrentNode));
							firstValue = false;
						} else {
							realType.setHigh(ParserUtil.getTextFromElement(withCurrentNode));
						}
					}
				}
			}
		}

		return realType;
	}

	/**
	 * @param n
	 * @return
	 */
	public static CPNType processTime(final Node n) {
		final CPNTime realType = CPNTypeParser.typeFactory.createCPNTime();
		return realType;
	}

	/**
	 * @param n
	 *            node
	 * @return type
	 */
	public static CPNType processList(final Node n) {
		final CPNList listType = CPNTypeParser.typeFactory.createCPNList();

		final NodeList nl = n.getChildNodes();
		for (int i = 0, cnt = nl.getLength(); i < cnt; i++) {
			final Node currentNode = nl.item(i);
			if (ParserUtil.isElementNodeOfType(currentNode, CPNTypeParser.withNode)) {
				final NodeList withNl = currentNode.getChildNodes();
				boolean firstValue = true;
				for (int j = 0, withCnt = withNl.getLength(); j < withCnt; j++) {
					final Node withCurrentNode = withNl.item(j);
					if (ParserUtil.isElementNodeOfType(withCurrentNode, CPNTypeParser.mlNode)) {
						if (firstValue) {
							listType.setLow(ParserUtil.getTextFromElement(withCurrentNode));
							firstValue = false;
						} else {
							listType.setHigh(ParserUtil.getTextFromElement(withCurrentNode));
						}
					}
				}
			} else if (ParserUtil.isElementNodeOfType(currentNode, CPNTypeParser.idNode)) {
				listType.setSort(ParserUtil.getTextFromElement(currentNode));
			}
		}

		return listType;
	}

	/**
	 * @param n
	 *            node
	 * @return type
	 */
	public static CPNType processProduct(final Node n) {
		final CPNProduct productType = CPNTypeParser.typeFactory.createCPNProduct();

		final NodeList nl = n.getChildNodes();
		for (int i = 0, cnt = nl.getLength(); i < cnt; i++) {
			final Node currentNode = nl.item(i);
			if (ParserUtil.isElementNodeOfType(currentNode, CPNTypeParser.idNode)) {
				productType.addSort(ParserUtil.getTextFromElement(currentNode));
			}
		}

		return productType;
	}

	/**
	 * @param n
	 *            node
	 * @return type
	 */
	public static CPNType processRecord(final Node n) {
		final CPNRecord recordType = CPNTypeParser.typeFactory.createCPNRecord();

		final NodeList nl = n.getChildNodes();
		for (int i = 0, cnt = nl.getLength(); i < cnt; i++) {
			final Node currentNode = nl.item(i);
			if (ParserUtil.isElementNodeOfType(currentNode, CPNTypeParser.recordfieldNode)) {
				final NodeList withNl = currentNode.getChildNodes();
				boolean firstValue = true;
				String id = null;
				String name = null;
				for (int j = 0, withCnt = withNl.getLength(); j < withCnt; j++) {
					final Node withCurrentNode = withNl.item(j);
					if (ParserUtil.isElementNodeOfType(withCurrentNode, CPNTypeParser.idNode)) {
						if (firstValue) {
							id = ParserUtil.getTextFromElement(withCurrentNode);
							firstValue = false;
						} else {
							name = ParserUtil.getTextFromElement(withCurrentNode);
						}
					}
				}

				recordType.addValue(id, name);
			}
		}

		return recordType;
	}

	/**
	 * @param n
	 *            node
	 * @return type
	 */
	public static CPNType processString(final Node n) {
		final CPNString stringType = CPNTypeParser.typeFactory.createCPNString();

		final NodeList nl = n.getChildNodes();
		for (int i = 0, cnt = nl.getLength(); i < cnt; i++) {
			final Node currentNode = nl.item(i);
			if (ParserUtil.isElementNodeOfType(currentNode, CPNTypeParser.withNode)) {
				final NodeList withNl = currentNode.getChildNodes();
				boolean firstValue = true;
				for (int j = 0, withCnt = withNl.getLength(); j < withCnt; j++) {
					final Node withCurrentNode = withNl.item(j);
					if (ParserUtil.isElementNodeOfType(withCurrentNode, CPNTypeParser.mlNode)) {
						if (firstValue) {
							stringType.setRangeLow(ParserUtil.getTextFromElement(withCurrentNode));
							firstValue = false;
						} else {
							stringType.setRangeHigh(ParserUtil.getTextFromElement(withCurrentNode));
						}
					} else if (ParserUtil.isElementNodeOfType(withCurrentNode, CPNTypeParser.andNode)) {
						final NodeList andNl = withCurrentNode.getChildNodes();
						boolean andFirstValue = true;
						for (int k = 0, andCnt = andNl.getLength(); k < andCnt; k++) {
							final Node andCurrentNode = andNl.item(k);
							if (ParserUtil.isElementNodeOfType(andCurrentNode, CPNTypeParser.mlNode)) {
								if (andFirstValue) {
									stringType.setLengthLow(ParserUtil.getTextFromElement(andCurrentNode));
									andFirstValue = false;
								} else {
									stringType.setLengthHigh(ParserUtil.getTextFromElement(andCurrentNode));
								}
							}
						}
					}
				}
			}
		}

		return stringType;
	}

	/**
	 * @param n
	 *            node
	 * @return type
	 */
	public static CPNType processSubset(final Node n) {
		final CPNSubset subsetType = CPNTypeParser.typeFactory.createCPNSubset();

		final NodeList nl = n.getChildNodes();
		for (int i = 0, cnt = nl.getLength(); i < cnt; i++) {
			final Node currentNode = nl.item(i);
			if (ParserUtil.isElementNodeOfType(currentNode, CPNTypeParser.withNode)) {
				subsetType.setWith(ParserUtil.getTextFromChild(currentNode, CPNTypeParser.mlNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, CPNTypeParser.byNode)) {
				subsetType.setBy(ParserUtil.getTextFromChild(currentNode, CPNTypeParser.mlNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, CPNTypeParser.idNode)) {
				subsetType.setSort(ParserUtil.getTextFromElement(currentNode));
			}
		}

		return subsetType;
	}

	/**
	 * @param n
	 *            node
	 * @return type
	 */
	public static CPNType processUnion(final Node n) {
		final CPNUnion unionType = CPNTypeParser.typeFactory.createCPNUnion();

		final NodeList nl = n.getChildNodes();
		for (int i = 0, cnt = nl.getLength(); i < cnt; i++) {
			final Node currentNode = nl.item(i);
			if (ParserUtil.isElementNodeOfType(currentNode, CPNTypeParser.unionfieldNode)) {
				final NodeList withNl = currentNode.getChildNodes();
				String id = null;
				String name = null;
				for (int j = 0, withCnt = withNl.getLength(); j < withCnt; j++) {
					final Node withCurrentNode = withNl.item(j);
					if (ParserUtil.isElementNodeOfType(withCurrentNode, CPNTypeParser.idNode)) {
						id = ParserUtil.getTextFromElement(withCurrentNode);
					} else if (ParserUtil.isElementNodeOfType(withCurrentNode, CPNTypeParser.typeNode)) {
						name = ParserUtil.getTextFromChild(withCurrentNode, CPNTypeParser.idNode);
					}
				}

				unionType.addValue(id, name);
			}
		}

		return unionType;
	}

	/**
	 * @param n
	 *            node
	 * @return type
	 */
	public static CPNType processUnit(final Node n) {
		final CPNUnit unit = CPNTypeParser.typeFactory.createCPNUnit();

		final NodeList nl = n.getChildNodes();
		for (int i = 0, cnt = nl.getLength(); i < cnt; i++) {
			final Node currentNode = nl.item(i);
			if (ParserUtil.isElementNodeOfType(currentNode, CPNTypeParser.withNode)) {
				unit.setId(ParserUtil.getTextFromChild(currentNode, CPNTypeParser.idNode));
			}
		}

		return unit;
	}

}
