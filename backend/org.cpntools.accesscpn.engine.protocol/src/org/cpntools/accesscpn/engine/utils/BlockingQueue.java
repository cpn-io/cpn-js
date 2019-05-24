/*
 * BRITNeY Suite Copyright (C) 2004-2006 Michael Westergaard and others This program is free software; you can
 * redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later version. This program is distributed in
 * the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. You should have received a
 * copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
 */
package org.cpntools.accesscpn.engine.utils;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

/**
 * @author Michael Westergaard
 * @param <E> element type
 */
public class BlockingQueue<E> {
	private final List<E> queue = Collections.synchronizedList(new LinkedList<E>());

	/**
	 * Get first element and remove it from the queue. Blocks until an element is added if isEmpty()
	 * 
	 * @return First element
	 */
	public E get() {
		synchronized (this) {
			while (true) {
				if (queue.isEmpty()) {
					try {
						wait();
					} catch (final InterruptedException ie) { /*
															 * Ignore error
															 */
					}
				} else {
					return queue.remove(0);
				}
			}
		}
	}

	/**
	 * @param object object to try to get
	 */
	public void get(final E object) {
		synchronized (this) {
			while (true) {
				if (queue.remove(object)) { return; }
				try {
					wait();
				} catch (final InterruptedException ie) { /*
														 * Ignore error
														 */
				}
			}
		}
	}

	/**
	 * Return whether the queue is empty
	 * 
	 * @return size() == 0
	 */
	public boolean isEmpty() {
		return queue.isEmpty();
	}

	/**
	 * Get first element from the queue. Blocks until an element is added if isEmpty()
	 * 
	 * @return First element
	 */
	public E peek() {
		synchronized (this) {
			while (true) {
				if (queue.isEmpty()) {
					try {
						wait();
					} catch (final InterruptedException ie) { /*
															 * Ignore error
															 */
					}
				} else {
					return queue.get(0);
				}
			}
		}
	}

	/**
	 * @param object object to add to queue
	 */
	public void put(final E object) {
		synchronized (this) {
			queue.add(object);
			notifyAll();
		}
	}

	/**
	 * Get the current number of elements in the queue
	 * 
	 * @return the size
	 */
	public int size() {
		return queue.size();
	}
}
