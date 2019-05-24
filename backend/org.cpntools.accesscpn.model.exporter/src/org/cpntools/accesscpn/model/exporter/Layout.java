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

package org.cpntools.accesscpn.model.exporter;

import java.util.Map;

import org.cpntools.accesscpn.model.Object;
import org.cpntools.accesscpn.model.Page;

/**
 * Layout object to set a position of an {@link Object} on a {@link Page}. The
 * default implementation {@link LayoutRandom} assigns a random position to each
 * object.
 *  
 * @author dfahland
 */
public interface Layout {

	/**
	 * Set the position of object <code>o</code> by updating the map
	 * <code>positions</code> with the coordinates of the object.
	 * 
	 * @param o
	 * @param positions
	 */
	public void setPosition(Object o, final Map<Object, DOMGenerator.Position> positions);
	
}
