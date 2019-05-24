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
package org.cpntools.accesscpn.engine.highlevel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;

import org.cpntools.accesscpn.model.Instance;
import org.cpntools.accesscpn.model.Page;


/**
 * @author mw
 */
public class PageSorter implements Iterable<Page> {

	private final HashSet<String> primePages;
	private final ArrayList<Page> sortedPages;

	/**
	 * @param pages
	 *            pages to sort
	 */
	public PageSorter(final List<Page> pages) {
		sortedPages = new ArrayList<Page>();
		primePages = new HashSet<String>();

		final HashMap<String, Page> idToPageMap = new HashMap<String, Page>();
		final HashMap<String, ArrayList<String>> pageMap = new HashMap<String, ArrayList<String>>();
		for (final Page page : pages) {
			idToPageMap.put(page.getId(), page);

			final ArrayList<String> idList = new ArrayList<String>();
			for (final Instance instance : page.readyInstances()) {
				idList.add(instance.getSubPageID());
			}
			pageMap.put(page.getId(), idList);
			primePages.add(page.getId());
		}

		while (!pageMap.isEmpty()) {
			final ArrayList<String> removedList = new ArrayList<String>();

			for (final Entry<String, ArrayList<String>> entry : pageMap.entrySet()) {
				if (entry.getValue().isEmpty()) {
					sortedPages.add(idToPageMap.get(entry.getKey()));
					removedList.add(entry.getKey());
				}
			}

			for (final String removedId : removedList) {
				pageMap.remove(removedId);

				for (final Entry<String, ArrayList<String>> entry : pageMap.entrySet()) {
					boolean wasRemoved = false;

					// This loop nessesery because remove only removes the first
					// element and we might have more than one instance of the
					// same
					// subpage
					while (entry.getValue().remove(removedId)) {
						wasRemoved = true;
					}
					if (wasRemoved) {
						primePages.remove(removedId);
					}
				}
			}
		}
	}

	/**
	 * @param page
	 *            page
	 * @return whether page is prime
	 */
	public boolean isPrime(final Page page) {
		return primePages.contains(page.getId());
	}

	/**
	 * @see java.lang.Iterable#iterator()
	 */
	@Override
    public Iterator<Page> iterator() {
		return sortedPages.iterator();
	}
}
