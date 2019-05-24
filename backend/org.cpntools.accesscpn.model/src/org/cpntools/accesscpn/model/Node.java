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
package org.cpntools.accesscpn.model;

import java.util.List;

import org.cpntools.accesscpn.model.graphics.NodeGraphics;

/**
 * @model abstract="true"
 * @author michael
 */
public interface Node extends org.cpntools.accesscpn.model.Object {
	/**
	 * @model containment="false" type="Arc"
	 * @return get all arcs where this node is source
	 */
	public List<Arc> getSourceArc();

	/**
	 * @model containment="false" type="Arc"
	 * @return get all arcs where this node is target
	 */
	public List<Arc> getTargetArc();

	/**
	 * @return whether this node is ready to be transmitted to the simulator
	 */
	public boolean isReady();

	/**
	 * @see org.cpntools.accesscpn.model.graphics.HasGraphics#getGraphics()
	 */
	public NodeGraphics getNodeGraphics();
}
