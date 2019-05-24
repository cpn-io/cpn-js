package org.cpntools.accesscpn.cosimulation;

import java.util.Calendar;
import java.util.HashMap;
import java.util.concurrent.Semaphore;

/**
 * @author michael
 */
public class ExecutionContext extends HashMap<String, Object> {
	private static final long serialVersionUID = 1L;
	private final Semaphore lock = new Semaphore(1);
	private final Calendar offset;
	private final long granularity;

	/**
	 * @param offset
	 * @param granularity
	 */
	public ExecutionContext(final Calendar offset, final long granularity) {
		this.offset = offset;
		this.granularity = granularity;
	}

	private static final int MAX = Integer.MAX_VALUE / 2;
	private static final int MIN = Integer.MIN_VALUE / 2;

	/**
	 * @param time
	 * @return
	 */
	public Calendar getTime(final Number time) {
		final Calendar result = Calendar.getInstance();
		long add = 0;
		if (time instanceof Long) {
			add = (Long) time * granularity;
		} else if (time instanceof Integer) {
			add = (Integer) time * granularity;
		} else if (time instanceof Short) {
			add = (Short) time * granularity;
		} else if (time instanceof Double) {
			add = (long) ((Double) time * granularity);
		} else if (time instanceof Float) {
			add = (long) ((double) (Float) time * granularity);
		} else {
			System.err.println("Received unknown time type " + time.getClass() + " with value " + time);
		}
		result.setTimeInMillis(offset.getTimeInMillis() + add);
		return result;
	}

	/**
	 * @param time
	 * @return
	 */
	public long getTime(final Calendar time) {
		return (time.getTimeInMillis() - offset.getTimeInMillis()) / granularity;
	}

	/**
	 * Lock execution context (and prevent simulation). Should be used in subpage-plug-ins or superpage plug-ins to lock
	 * simulation which an atomic non-simulation action is taken.
	 */
	public void lock() {
// System.out.println("--- Attempting to lock for " + Thread.currentThread());
		while (true) {
			try {
				lock.acquire();
// System.out.println("--- Locked for " + Thread.currentThread());
				return;
			} catch (final InterruptedException e) { // I would like to extend my death wishes to anybody who thought
// returning with an InterruptedException when acquiring a lock withou notifying that you didn't obtain the lock!
			}
		}
	}

	/**
	 * Unlock execution context.
	 */
	public void unlock() {
// System.out.println("--- Releasing lock for " + Thread.currentThread());
		lock.release();
	}
}
