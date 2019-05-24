/************************************************************************/
/* Access/CPN */
/* Copyright 2010-2011 AIS Group, Eindhoven University of Technology */
/*                                                                      */
/* This library is free software; you can redistribute it and/or */
/* modify it under the terms of the GNU Lesser General Public */
/* License as published by the Free Software Foundation; either */
/* version 2.1 of the License, or (at your option) any later version. */
/*                                                                      */
/* This library is distributed in the hope that it will be useful, */
/* but WITHOUT ANY WARRANTY; without even the implied warranty of */
/* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU */
/* Lesser General Public License for more details. */
/*                                                                      */
/* You should have received a copy of the GNU Lesser General Public */
/* License along with this library; if not, write to the Free Software */
/* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, */
/* MA 02110-1301 USA */
/************************************************************************/
package org.cpntools.accesscpn.model.importer;

import java.util.ArrayList;

import org.cpntools.accesscpn.model.HLDeclaration;
import org.cpntools.accesscpn.model.declaration.DeclarationFactory;
import org.cpntools.accesscpn.model.declaration.GlobalReferenceDeclaration;
import org.cpntools.accesscpn.model.declaration.MLDeclaration;
import org.cpntools.accesscpn.model.declaration.TypeDeclaration;
import org.cpntools.accesscpn.model.declaration.UseDeclaration;
import org.cpntools.accesscpn.model.declaration.VariableDeclaration;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 * @author mw
 */
public class DeclarationParser {

	/**
	 * 
	 */
	public static final String aliasNode = "alias";

	/**
	 * 
	 */
	public static final String andNode = "and";
	/**
	 * 
	 */
	public static final String blockNode = "block";
	/**
	 * 
	 */
	public static final String boolNode = "bool";
	/**
	 * 
	 */
	public static final String colorNode = "color";
	/**
	 * 
	 */
	public static final String declareNode = "declare";
	private static final DeclarationFactory declFactory = DeclarationFactory.INSTANCE;
	/**
	 * 
	 */
	public static final String enumNode = "enum";
	/**
	 * 
	 */
	public static final String globrefNode = "globref";

	/**
	 * 
	 */
	public static final String idNode = "id";
	/**
	 * 
	 */
	public static final String indexNode = "index";
	/**
	 * 
	 */
	public static final String intNode = "int";
	/**
	 * 
	 */
	public static final String listNode = "list";
	/**
	 * 
	 */
	public static final String mlNode = "ml";
	/**
	 * 
	 */
	public static final String productNode = "product";
	/**
	 * 
	 */

	public static final String realNode = "real";

	/**
	 * 
	 */
	public static final String intinfNode = "intinf";

	/**
	 * 
	 */
	public static final String timeNode = "time";
	/**
	 * 
	 */
	public static final String recordfieldNode = "recordfield";
	/**
	 * 
	 */
	public static final String recordNode = "record";
	/**
	 * 
	 */
	public static final String stringNode = "string";
	/**
	 * 
	 */
	public static final String subsetNode = "subset";
	/**
	 * 
	 */
	public static final String timedNode = "timed";
	/**
	 * 
	 */
	public static final String typeNode = "type";

	/**
	 * 
	 */
	public static final String unionNode = "union";
	/**
	 * 
	 */
	public static final String unitNode = "unit";
	/**
	 * 
	 */
	public static final String useNode = "use";
	/**
	 * 
	 */
	public static final String varNode = "var";

	/**
	 * 
	 */
	public static final String withNode = "with";

	/**
	 * @param n
	 *            node
	 * @return color decl
	 * @throws NetDeclarationException
	 *             if error occurred
	 */
	public static HLDeclaration processColor(final Node n) throws NetDeclarationException {
		final TypeDeclaration color = DeclarationParser.declFactory.createTypeDeclaration();
		boolean timed = false;
		ArrayList<String> declares = new ArrayList<String>();

		final NodeList nl = n.getChildNodes();
		for (int i = 0, cnt = nl.getLength(); i < cnt; i++) {
			final Node currentNode = nl.item(i);
			if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.idNode)) {
				color.setTypeName(ParserUtil.getTextFromElement(currentNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.declareNode)) {
				declares = DeclarationParser.processDeclare(currentNode);
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.timedNode)) {
				timed = true;
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.unitNode)) {
				color.setSort(CPNTypeParser.processUnit(currentNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.boolNode)) {
				color.setSort(CPNTypeParser.processBool(currentNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.intNode)) {
				color.setSort(CPNTypeParser.processInt(currentNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.stringNode)) {
				color.setSort(CPNTypeParser.processString(currentNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.enumNode)) {
				color.setSort(CPNTypeParser.processEnum(currentNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.indexNode)) {
				color.setSort(CPNTypeParser.processIndex(currentNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.productNode)) {
				color.setSort(CPNTypeParser.processProduct(currentNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.recordNode)) {
				color.setSort(CPNTypeParser.processRecord(currentNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.listNode)) {
				color.setSort(CPNTypeParser.processList(currentNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.unionNode)) {
				color.setSort(CPNTypeParser.processUnion(currentNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.aliasNode)) {
				color.setSort(CPNTypeParser.processAlias(currentNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.subsetNode)) {
				color.setSort(CPNTypeParser.processSubset(currentNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.realNode)) {
				color.setSort(CPNTypeParser.processReal(currentNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.timeNode)) {
				color.setSort(CPNTypeParser.processTime(currentNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.intinfNode)) {
				color.setSort(CPNTypeParser.processIntInf(currentNode));
			}
		}

		for (final String declare : declares) {
			color.getSort().addDeclare(declare);
		}
		if (color.getSort() != null) {
			color.getSort().setTimed(timed);
		}

		return DOMParser.getHLDeclaration(color, n);
	}

	/**
	 * @param n
	 *            node
	 * @return declare part
	 */
	public static ArrayList<String> processDeclare(final Node n) {
		final ArrayList<String> declares = new ArrayList<String>();

		final NodeList nl = n.getChildNodes();
		for (int i = 0, cnt = nl.getLength(); i < cnt; i++) {
			final Node currentNode = nl.item(i);
			if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.idNode)) {
				declares.add(ParserUtil.getTextFromElement(currentNode));
			}
		}

		return declares;
	}

	/**
	 * @param n
	 *            node
	 * @return list of decls
	 * @throws NetDeclarationException
	 *             error occurred
	 */
	public static ArrayList<HLDeclaration> processDecls(final Node n) throws NetDeclarationException {
		final ArrayList<HLDeclaration> labels = new ArrayList<HLDeclaration>();

		final NodeList nl = n.getChildNodes();
		for (int i = 0, cnt = nl.getLength(); i < cnt; i++) {
			final Node currentNode = nl.item(i);
			if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.blockNode)) {
				labels.addAll(DeclarationParser.processDecls(currentNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.colorNode)) {
				labels.add(DeclarationParser.processColor(currentNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.varNode)) {
				labels.add(DeclarationParser.processVar(currentNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.mlNode)) {
				labels.add(DeclarationParser.processML(currentNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.globrefNode)) {
				labels.add(DeclarationParser.processGlobref(currentNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.useNode)) {
				labels.add(DeclarationParser.processUse(currentNode));
			}
		}

		return labels;
	}

	/**
	 * @param n
	 *            node
	 * @return globref decl
	 */
	public static HLDeclaration processGlobref(final Node n) {
		final GlobalReferenceDeclaration globref = DeclarationParser.declFactory.createGlobalReferenceDeclaration();

		final NodeList nl = n.getChildNodes();
		for (int i = 0, cnt = nl.getLength(); i < cnt; i++) {
			final Node currentNode = nl.item(i);
			if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.idNode)) {
				globref.setName(ParserUtil.getTextFromElement(currentNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.mlNode)) {
				globref.setValue(ParserUtil.getTextFromElement(currentNode));
			}
		}

		return DOMParser.getHLDeclaration(globref, n);
	}

	/**
	 * @param n
	 *            node
	 * @return ml decl
	 */
	public static HLDeclaration processML(final Node n) {
		final MLDeclaration mld = DeclarationParser.declFactory.createMLDeclaration();
		mld.setCode(ParserUtil.getTextFromElement(n));
		return DOMParser.getHLDeclaration(mld, n);
	}

	/**
	 * @param n
	 *            node
	 * @return use decl
	 */
	public static HLDeclaration processUse(final Node n) {
		final UseDeclaration use = DeclarationParser.declFactory.createUseDeclaration();

		final NodeList nl = n.getChildNodes();
		for (int i = 0, cnt = nl.getLength(); i < cnt; i++) {
			final Node currentNode = nl.item(i);
			if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.mlNode)) {
				use.setFileName(ParserUtil.getTextFromElement(currentNode));
			}
		}

		return DOMParser.getHLDeclaration(use, n);
	}

	/**
	 * @param n
	 *            node
	 * @return var decl
	 */
	public static HLDeclaration processVar(final Node n) {
		final VariableDeclaration varDecl = DeclarationParser.declFactory.createVariableDeclaration();

		final NodeList nl = n.getChildNodes();
		for (int i = 0, cnt = nl.getLength(); i < cnt; i++) {
			final Node currentNode = nl.item(i);
			if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.typeNode)) {
				varDecl.setTypeName(ParserUtil.getTextFromChild(currentNode, DeclarationParser.idNode));
			} else if (ParserUtil.isElementNodeOfType(currentNode, DeclarationParser.idNode)) {
				varDecl.addVariable(ParserUtil.getTextFromElement(currentNode));
			}
		}

		return DOMParser.getHLDeclaration(varDecl, n);
	}
}
