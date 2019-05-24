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
package org.cpntools.accesscpn.engine.highlevel.checker;

import java.util.List;

import org.cpntools.accesscpn.model.HLDeclaration;
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
import org.cpntools.accesscpn.model.cpntypes.NameTypePair;
import org.cpntools.accesscpn.model.declaration.TypeDeclaration;

/**
 * @author mwesterg
 */
public class SerializerGenerator {
	private static final SerializerGenerator instance = new SerializerGenerator();

	/**
	 * @return
	 */
	public static SerializerGenerator getInstance() {
		return instance;
	}

	protected SerializerGenerator() {
		// Hide
	}

	/**
	 * @param declarations
	 * @return
	 */
	public String generate(final List<HLDeclaration> declarations) {
		final StringBuilder sb = new StringBuilder();
		sb.append("structure CPN'SerializerJava = struct\n");
		sb.append("local open JavaExecute in\n");

		for (final HLDeclaration declaration : declarations) {
			if (declaration.getStructure() instanceof TypeDeclaration) {
				generate(sb, (TypeDeclaration) declaration.getStructure());
			}
		}

		sb.append("fun CPN'serializeplace CPN'f CPN'v = vLIST (List.map CPN'f CPN'v)\n");
		sb.append("end end");
		return sb.toString();
	}

	private void generate(final StringBuilder sb, final TypeDeclaration structure) {
		final CPNType type = structure.getSort();
		if (type instanceof CPNUnit) {
			generateUnit(sb, structure);
		} else if (type instanceof CPNBool) {
			generateBool(sb, structure);
		} else if (type instanceof CPNInt) {
			generateInt(sb, structure);
		} else if (type instanceof CPNIntInf) {
			generateIntInf(sb, structure);
		} else if (type instanceof CPNReal) {
			generateReal(sb, structure);
		} else if (type instanceof CPNTime) {
			generateTime(sb, structure);
		} else if (type instanceof CPNString) {
			generateString(sb, structure);
		} else if (type instanceof CPNEnum) {
			generateEnum(sb, structure);
		} else if (type instanceof CPNIndex) {
			generateIndex(sb, structure);
		} else if (type instanceof CPNList) {
			generateList(sb, structure);
		} else if (type instanceof CPNProduct) {
			generateProduct(sb, structure);
		} else if (type instanceof CPNRecord) {
			generateRecord(sb, structure);
		} else if (type instanceof CPNUnion) {
			generateUnion(sb, structure);
		} else if (type instanceof CPNSubset) {
			generateSubset(sb, structure);
		} else if (type instanceof CPNAlias) {
			generateAlias(sb, structure);
		}
	}

	private void generateAlias(final StringBuilder sb, final TypeDeclaration structure) {
		final CPNAlias type = (CPNAlias) structure.getSort();
		generateFunctionSignature(sb, structure);
		generateHeadAndBody(sb, "CPN'v", "CPN'serialize'" + type.getSort() + "' CPN'v");
		generateFinalizer(sb, structure);
	}

	private void generateSubset(final StringBuilder sb, final TypeDeclaration structure) {
		final CPNSubset type = (CPNSubset) structure.getSort();
		generateFunctionSignature(sb, structure);
		generateHeadAndBody(sb, "CPN'v", "CPN'serialize'" + type.getSort() + "' CPN'v");
		generateFinalizer(sb, structure);
	}

	private void generateUnion(final StringBuilder sb, final TypeDeclaration structure) {
		final CPNUnion type = (CPNUnion) structure.getSort();
		boolean first = true;
		for (final NameTypePair t : type.getValues()) {
			generateFunctionSignature(sb, structure, first);
			if (t.getSort() != null && !"".equals(t.getSort())) {
				generateHeadAndBody(sb, t.getName() + " CPN'v", "vLIST [vSTRING \"" + t.getName()
				        + "\", CPN'serialize'" + t.getSort() + "' CPN'v]");
			} else {
				generateHeadAndBody(sb, t.getName(), "vLIST [vSTRING \"" + t.getName() + "\", vBOOL false]");
			}
			first = false;
		}
		generateFinalizer(sb, structure);
	}

	private void generateRecord(final StringBuilder sb, final TypeDeclaration structure) {
		final CPNRecord type = (CPNRecord) structure.getSort();
		final StringBuilder head = new StringBuilder(), body = new StringBuilder();

		head.append("{");
		body.append("vLIST [");

		int i = 0;
		for (final NameTypePair t : type.getValues()) {
			if (i != 0) {
				head.append(", ");
				body.append(", ");
			}
			head.append(t.getName());
			head.append(" = CPN'v");
			head.append(i);
			body.append("vLIST [vSTRING \"");
			body.append(t.getName());
			body.append("\", ");
			body.append("CPN'serialize'");
			body.append(t.getSort());
			body.append("' CPN'v");
			body.append(i);
			body.append("]");
			i++;
		}
		head.append("}");
		body.append("]");

		generateFunctionSignature(sb, structure);
		generateHeadAndBody(sb, head.toString(), body.toString());
		generateFinalizer(sb, structure);
	}

	private void generateProduct(final StringBuilder sb, final TypeDeclaration structure) {
		final CPNProduct type = (CPNProduct) structure.getSort();
		final StringBuilder head = new StringBuilder(), body = new StringBuilder();

		head.append("(");
		body.append("vLIST [");

		int i = 0;
		for (final String t : type.getTypes()) {
			if (i != 0) {
				head.append(", ");
				body.append(", ");
			}
			head.append("CPN'v");
			head.append(i);
			body.append("CPN'serialize'");
			body.append(t);
			body.append("' CPN'v");
			body.append(i);
			i++;
		}
		head.append(")");
		body.append("]");

		generateFunctionSignature(sb, structure);
		generateHeadAndBody(sb, head.toString(), body.toString());
		generateFinalizer(sb, structure);
	}

	private void generateList(final StringBuilder sb, final TypeDeclaration structure) {
		final CPNList type = (CPNList) structure.getSort();
		generateFunctionSignature(sb, structure);
		generateHeadAndBody(sb, "CPN'v", "vLIST (List.map CPN'serialize'" + type.getSort() + "' CPN'v)");
		generateFinalizer(sb, structure);
	}

	private void generateIndex(final StringBuilder sb, final TypeDeclaration structure) {
		final CPNIndex type = (CPNIndex) structure.getSort();
		generateFunctionSignature(sb, structure);
		generateHeadAndBody(sb, type.getName() + "(CPN'v)", "vLIST [vSTRING (String.concat[\"" + type.getName()
		        + "(\", Int.toString CPN'v, \")\"]), vINT CPN'v]");
		generateFinalizer(sb, structure);
	}

	private void generateEnum(final StringBuilder sb, final TypeDeclaration structure) {
		final CPNEnum type = (CPNEnum) structure.getSort();
		int i = 0;
		for (final String value : type.getValues()) {
			generateFunctionSignature(sb, structure, i == 0);
			generateHeadAndBody(sb, value, "vLIST [vSTRING \"" + value + "\", vINT " + i + "]");
			i++;
		}
		generateFinalizer(sb, structure);
	}

	private void generateString(final StringBuilder sb, final TypeDeclaration structure) {
		generateFunctionSignature(sb, structure);
		generateHeadAndBody(sb, "CPN'v", "vSTRING CPN'v");
		generateFinalizer(sb, structure);
	}

	private void generateInt(final StringBuilder sb, final TypeDeclaration structure) {
		generateFunctionSignature(sb, structure);
		generateHeadAndBody(sb, "CPN'v", "vINT CPN'v");
		generateFinalizer(sb, structure);
	}

	private void generateIntInf(final StringBuilder sb, final TypeDeclaration structure) {
		generateFunctionSignature(sb, structure);
		generateHeadAndBody(sb, "CPN'v", "vSTRING (" + structure.getTypeName() + ".mkstr CPN'v)");
		generateFinalizer(sb, structure);
	}

	private void generateReal(final StringBuilder sb, final TypeDeclaration structure) {
		generateFunctionSignature(sb, structure);
		generateHeadAndBody(sb, "CPN'v", "vSTRING (" + structure.getTypeName() + ".mkstr CPN'v)");
		generateFinalizer(sb, structure);
	}

	private void generateTime(final StringBuilder sb, final TypeDeclaration structure) {
		generateFunctionSignature(sb, structure);
		generateHeadAndBody(sb, "CPN'v", "vSTRING (" + structure.getTypeName() + ".mkstr CPN'v)");
		generateFinalizer(sb, structure);
	}

	private void generateBool(final StringBuilder sb, final TypeDeclaration structure) {
		generateFunctionSignature(sb, structure);
		generateHeadAndBody(sb, "CPN'v", "vBOOL CPN'v");
		generateFinalizer(sb, structure);
	}

	private void generateUnit(final StringBuilder sb, final TypeDeclaration structure) {
		generateFunctionSignature(sb, structure);
		generateHeadAndBody(sb, "()", "vBOOL false");
		generateFinalizer(sb, structure);
	}

	private void generateFinalizer(final StringBuilder sb, final TypeDeclaration structure) {
		if (structure.getSort().getTimed()) {
			sb.append("fun CPN'serialize'");
			sb.append(structure.getTypeName());
			sb.append(" (CPN'v @ CPN't) = vLIST [CPN'serialize'");
			sb.append(structure.getTypeName());
			sb.append("' CPN'v, vSTRING (ModelTime.toString CPN't)]\n");
		} else {
			sb.append("val CPN'serialize'");
			sb.append(structure.getTypeName());
			sb.append(" = CPN'serialize'");
			sb.append(structure.getTypeName());
			sb.append("'\n");
		}
	}

	private void generateHeadAndBody(final StringBuilder sb, final String parameter, final String body) {
		sb.append("(");
		sb.append(parameter);
		sb.append(") = ");
		sb.append(body);
		sb.append('\n');
	}

	private void generateFunctionSignature(final StringBuilder sb, final TypeDeclaration structure) {
		generateFunctionSignature(sb, structure, true);
	}

	private void generateFunctionSignature(final StringBuilder sb, final TypeDeclaration structure, final boolean first) {
		if (first) {
			sb.append("fun CPN'serialize'");
		} else {
			sb.append("  | CPN'serialize'");
		}
		sb.append(structure.getTypeName());
		sb.append("'");
	}
}
