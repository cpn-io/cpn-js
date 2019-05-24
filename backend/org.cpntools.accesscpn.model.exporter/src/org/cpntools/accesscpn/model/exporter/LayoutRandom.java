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

/**
 * Random layout: put each node on a random position.
 * 
 * @author dfahland
 */
public class LayoutRandom implements Layout {
	
	/*
	 * (non-Javadoc)
	 * @see org.cpntools.accesscpn.model.exporter.Layout#setPosition(org.cpntools.accesscpn.model.Object, java.util.Map)
	 */
	@Override
	public void setPosition(Object o, Map<Object, DOMGenerator.Position> positions) {
		// Assign a random position
		int x = (int) (Math.random() * 1000);
		int y = (int) (Math.random() * 800);
		positions.put(o, new DOMGenerator.Position(x, y));
	}

}
