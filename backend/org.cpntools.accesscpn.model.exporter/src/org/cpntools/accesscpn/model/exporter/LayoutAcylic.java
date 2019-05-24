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

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

import org.cpntools.accesscpn.model.Arc;
import org.cpntools.accesscpn.model.Node;
import org.cpntools.accesscpn.model.Object;
import org.cpntools.accesscpn.model.Page;

/**
 * Simple layout for acyclic nets. Computes the rank of the nodes on a page.
 * Nodes of the same rank are enumerated. A node's rank sets its Y-coordinate,
 * its number on the rank it's X-coordinate. If the net structure is cylic, rank
 * computation stops as soon as a cycle is reached. Nodes for which no rank is
 * computed will be placed randomly using {@link LayoutRandom}.
 * 
 * @author dfahland
 * 
 */
public class LayoutAcylic extends LayoutRandom {

	/**
	 * Create new layout object and compute ranks of the nodes on the
	 * <code>page</code>. Call {@link #setPosition(Object, Map)} to set the
	 * position of a node based on its rank.
	 * 
	 * @param page
	 */
	public LayoutAcylic(Page page) {
		computeRanks(page);
	}
	
	private HashMap<Node, Integer> rank;			// rank of a node
	private HashMap<Integer, Integer> rankCount;	// number of nodes in the same rank
	private HashMap<Node, Integer> rankNum;			// enumeration of nodes in the same rank

	/**
	 * Compute the ranks of all nodes on the <code>page</code>.
	 * 
	 * @param page
	 */
	private void computeRanks(Page page) {
		
		rank = new HashMap<Node, Integer>();
		rankNum = new HashMap<Node, Integer>();
		rankCount = new HashMap<Integer, Integer>();
		
		// collect all ndoes without predecessor: rank 0
		LinkedList<Node> queue = new LinkedList<Node>();
		for (Object o : page.getObject()) {
			if (o instanceof Node) {
				Node n = (Node)o;
				if (n.getTargetArc().isEmpty()) {
					queue.addLast(n);
					assignRank(n, 0);
				}
			}
		}
		
		// breadth first search on nodes of which all predecessors have been
		// processed
		while (!queue.isEmpty()) {
			Node n = queue.removeFirst();
			// check all successors of m
			for (Arc a : n.getSourceArc()) {
				Node m = a.getTarget();
				// rank already assigned (cyclic structure), skip
				if (rank.containsKey(m)) continue;
				
				// see whether all predecessor of 'm' have been processed and
				// collect the largest rank of all predecessors 
				boolean explore_m = true;
				int max_pre_rank = 0;
				
				// if among the predecessors of 'm' there is a node 'l' that is
				// also successor of 'm' (i.e. a loop), we will place 'l' and
				// 'm' on the same rank. Remember these nodes 'l' in a list.  
				LinkedList<Node> sameRankList = new LinkedList<Node>();
				for (Arc b : m.getTargetArc()) {
					Node l = b.getSource();
					
					// check predecessors of node 'm'
					if (!rank.containsKey(l)) {
						// Node 'l' has not been assigned a rank yet. Process
						// 'm' only after 'l' was processed. But first check
						// whether there is a loop of length 1 between both 'm'
						// and 'l'.
						boolean l_is_looped = false;
						for (Arc c : m.getSourceArc()) {
							if (c.getTarget() == l) {
								// yes, 'm' has an outgoing arc 'c' that ends in 'l' as well
								l_is_looped = true;
								break;
							}
						}
						
						if (l_is_looped) {
							// put 'l' and 'm' on the same rank (i.e. do not
							// wait until rank of 'l' was computed
							sameRankList.add(l);
						} else {
							// wait until rank of 'l' was computed
							explore_m = false;
							break;
						}
					}
					// remember maximum of all ranks of all predecessors of 'm'
					if (rank.containsKey(l) && max_pre_rank < rank.get(l)) {
						max_pre_rank = rank.get(l);
					}
				}
				if (explore_m) {
					// set rank of 'm' and put it to the queue (to explore it successors)
					queue.addLast(m);
					assignRank(m, max_pre_rank+1);
					for (Node l : sameRankList) assignRank(l, max_pre_rank+1);
				}
			}
		}
	}
	
	/**
	 * Assign rank <code>rankVal</code> to node <code>n</code> and compute
	 * number of <code>n</code> in this rank.
	 * 
	 * @param n
	 * @param rankVal
	 */
	private void assignRank(Node n, int rankVal) {
		rank.put(n, rankVal);
		if (!rankCount.containsKey(rankVal)) rankCount.put(rankVal, 0);
		rankNum.put(n, rankCount.get(rankVal));
		rankCount.put(rankVal, rankCount.get(rankVal)+1);
	}
	
	/*
	 * (non-Javadoc)
	 * @see org.cpntools.accesscpn.model.exporter.LayoutRandom#setPosition(org.cpntools.accesscpn.model.Object, java.util.Map)
	 */
	@Override
	public void setPosition(Object o, Map<Object, DOMGenerator.Position> positions) {
		if (   rank != null && rank.containsKey(o)
			&& rankNum != null && rankNum.containsKey(o))
		{
			int x = rankNum.get(o) * 100;
			int y = rank.get(o) * -100;
			positions.put(o, new DOMGenerator.Position(x, y));
		}
		else
			super.setPosition(o, positions);
	}
}
