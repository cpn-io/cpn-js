/*
 * BRITNeY Suite Copyright (C) 2004-2006 Michael Westergaard and others This program is free software; you can
 * redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later version. This program is distributed in
 * the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. You should have received a
 * copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
 */
package org.cpntools.accesscpn.engine;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Observable;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import org.cpntools.accesscpn.engine.protocol.Packet;
import org.cpntools.accesscpn.engine.protocol.handler.Handler;
import org.cpntools.accesscpn.engine.utils.BlockingQueue;

/**
 * @author Michael Westergaard
 */
public final class Simulator extends Observable {
	/**
	 * @author mw
	 */
	public class Error extends Output {
		Error(final String text) {
			super(text);
		}
	}

	/**
	 * @author mw
	 */
	public class PartialResult extends Output {
		private final boolean error;

		PartialResult(final String text) {
			super(text);
			error = false;
		}

		PartialResult(final String text, final boolean error) {
			super(text);
			this.error = error;
		}

		/**
		 * @return whether this was definitely an error
		 */
		public boolean isError() {
			return error;
		}
	}

	/**
	 * @author mw
	 */
	public class Input extends Message {
		Object source;

		Input(final Object source, final String text) {
			super(text);
			this.source = source;
		}

		/**
		 * @return source
		 */
		public Object getSource() {
			return source;
		}
	}

	/**
	 * @author mw
	 */
	public abstract class Message extends SimulatorUpdate {
		String text;

		Message(final String text) {
			this.text = text;
		}

		/**
		 * @return text
		 */
		public String getText() {
			return text;
		}
	}

	/**
	 * @author mw
	 */
	public abstract class SimulatorUpdate {
		// Empty base class
	}

	/**
	 * @author mwesterg
	 */
	public abstract class SimulationExecuted extends SimulatorUpdate {
		// Empty base calss
	}

	/**
	 * @author mwesterg
	 */
	public static class SimpleInstance {
		private final int instance;
		private final String id;

		/**
		 * @param instance
		 * @param id
		 */
		public SimpleInstance(final int instance, final String id) {
			this.instance = instance;
			this.id = id;
		}

		/**
		 * @return
		 */
		public int getInstance() {
			return instance;
		}

		/**
		 * @return
		 */
		public String getId() {
			return id;
		}
	}

	/**
	 * @author mwesterg
	 */
	public static class SimpleMarking {
		private final int count;
		private final String marking;

		/**
		 * @param count
		 * @param marking
		 */
		public SimpleMarking(final int count, final String marking) {
			this.count = count;
			this.marking = marking;
		}

		/**
		 * @return
		 */
		public int getCount() {
			return count;
		}

		/**
		 * @return
		 */
		public String getMarking() {
			return marking;
		}
	}

	/**
	 * @author mwesterg
	 */
	public class SimulatorStateChanged extends SimulatorUpdate {
		private final Map<SimpleInstance, SimpleMarking> markings;
		private final Map<SimpleInstance, Boolean> enablings;
		private final String step;
		private final String time;

		/**
		 * @param markings
		 * @param enablings
		 * @param time
		 * @param step
		 */
		public SimulatorStateChanged(final Map<SimpleInstance, SimpleMarking> markings,
		        final Map<SimpleInstance, Boolean> enablings, final String time, final String step) {
			this.markings = markings;
			this.enablings = enablings;
			this.step = step;
			this.time = time;
		}

		/**
		 * @return
		 */
		public Map<SimpleInstance, SimpleMarking> getMarkings() {
			return markings;
		}

		/**
		 * @return
		 */
		public Map<SimpleInstance, Boolean> getEnablings() {
			return enablings;
		}

		/**
		 * @return
		 */
		public String getStep() {
			return step;
		}

		/**
		 * @return
		 */
		public String getTime() {
			return time;
		}
	}

	/**
	 * @author mw
	 */
	public abstract class PacketUpdate extends SimulatorUpdate {
		Packet p;

		PacketUpdate(final Packet p) {
			this.p = p;
		}

		/**
		 * @return the packet
		 */
		public Packet getPacket() {
			return p;
		}
	}

	/**
	 * @author mw
	 */
	public class PacketSent extends PacketUpdate {

		PacketSent(final Packet p) {
			super(p);
		}

	}

	/**
	 * @author mw
	 */
	public class PacketReceived extends PacketUpdate {

		PacketReceived(final Packet p) {
			super(p);
		}

	}

	/**
	 * @author mw
	 */
	public class Output extends Message {
		Output(final String text) {
			super(text);
		}
	}

	class ReceiverThread extends Thread {

		public ReceiverThread() {
			super("Receiver for packets");
			setDaemon(true);
		}

		@Override
		public void run() {
			try {
				while (true) {
					Packet p = implementation.receive();
					if (p.isGFC() || p.isCB()) {
						if (p.isCB()) {
							p = handleRefresh(p);
						} else {
							p = handle(p);
						}
						sendLock.lock();
						implementation.send(p);
						sendLock.unlock();
					} else {
						packetQueue.put(p);
					}
				}
			} catch (final IOException e) {
				// Mask IO errors
			}
		}
	}

	class EvalReceiverThread extends Thread {
		public EvalReceiverThread() {
			super("Receiver for eval data");
			setDaemon(true);
		}

		@Override
		public void run() {
			StringBuilder sb = new StringBuilder();
			final byte[] data = new byte[1024];
			try {
				while (true) {
					final int count = implementation.getEvalBytes(data, 0, data.length);
					if (count == -1) { return; }
					int first = 0;
					for (int i = 0; i < count; i++) {
						final byte b = data[i];
						if (b == 1 || b == 2) {
							if (b == 1) {
								if (i != first) {
									forceNotify(new PartialResult(new String(data, first, i - first - 1), false));
								}
								evalQueue.put(sb.toString());
							} else {
								if (i != first) {
									forceNotify(new PartialResult(new String(data, first, i - first - 1), true));
								}
								evalQueue.put(new EvaluationException(sb.toString()));
							}
							sb = new StringBuilder();
							first = i + 1;
						} else {
							sb.append((char) b);
						}
					}
					if (first != count) {
						forceNotify(new PartialResult(new String(data, first, count - first)));
					}
				}
			} catch (final IOException e) {
				// Done
			}
		}
	}

	private static final boolean debug = false;

	final BlockingQueue<Packet> packetQueue;

	ArrayList<Handler> handlers;

	SimulatorImplementation implementation;

	Lock lock, sendLock;

	String id;

	final BlockingQueue<Object> evalQueue;

	/**
	 * @param implementation
	 *            implementation delegate
	 */
	public Simulator(final SimulatorImplementation implementation) {
		this.implementation = implementation;
		packetQueue = new BlockingQueue<Packet>();
		evalQueue = new BlockingQueue<Object>();
		lock = new ReentrantLock();
		sendLock = new ReentrantLock();
		id = SimulatorService.getInstance().getUniqueId(this);
		handlers = new ArrayList<Handler>();
		setHandler(1, new StateChangedHandler());
		new ReceiverThread().start();
		new EvalReceiverThread().start();
	}

	class StateChangedHandler implements Handler {
		@Override
		public Object handle(final List<Object> values) {
			// TODO Auto-generated method stub
			return null;
		}

	}

	synchronized void forceNotify(final SimulatorUpdate m) {
		setChanged();
		notifyObservers(m);
	}

	/**
	 */
	public void destroy() {
		SimulatorService.getInstance().unregisterSimulator(id, this);
		implementation.destroy();
	}

	/**
	 * Evaluate ML code directly
	 * 
	 * @param expr
	 *            the expression to evaluate
	 * @param source
	 *            source to be notified of updates
	 * @return the result of the evaluation
	 * @throws Exception
	 *             if ML raises an exception
	 */
	public String evaluate(final Object source, final String expr) throws Exception {
		lock();
		if (!packetQueue.isEmpty()) { throw new IOException("PacketQueue contains stale data"); }
		if (!evalQueue.isEmpty()) { throw new IOException("EvalQueue contains stale data"); }
		forceNotify(new Input(source, expr));
		final Object result;
		try {
			if (Simulator.debug) {
				System.out.println("expr: " + expr);
			}
			final Packet p = new Packet(expr);
			sendLock.lock();
			try {
				implementation.send(p);
			} finally {
				sendLock.unlock();
			}
			result = evalQueue.get();
			if (!(result instanceof String) && !(result instanceof Exception)) { throw new IOException(
			        "Received result of incomprehensible type: " + result); }
		} catch (final Exception e) {
			if (Simulator.debug) {
				System.out.println("failed: " + e.getMessage());
			}
			if (!packetQueue.isEmpty()) { throw new IOException("Expected no reply in PacketQueue, got at least one"); }
			if (!evalQueue.isEmpty()) { throw new IOException("Expected no reply in EvalQueue, got at least one"); }
			throw e;
		} finally {
			release();
		}
		if (!packetQueue.isEmpty()) { throw new IOException("Expected no reply, got at least one"); }
		if (!evalQueue.isEmpty()) { throw new IOException("Expected only one eval result; got more"); }
		if (result instanceof String) {
			if (Simulator.debug) {
				System.out.println("result: " + result);
			}
			forceNotify(new Output((String) result));
			return (String) result;
		} else {
			assert result instanceof Exception;
			final Exception e = (Exception) result;
			if (Simulator.debug) {
				System.out.println("failed: " + e.getMessage());
			}
			forceNotify(new Error(e.getMessage()));
			throw e;
		}
	}

	/**
	 * @param expr
	 *            expression to evaluate
	 * @return the response from ML
	 * @throws Exception
	 *             the exception raised by ML if any
	 */
	public String evaluate(final String expr) throws Exception {
		return evaluate(this, expr);
	}

	/**
	 * @return the version banner from the simulator
	 */
	public String getBanner() {
		return implementation.getBanner();
	}

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * Lock the current simulator. This can be used when more than one call to send ore evaluate are required. It is not
	 * needed for one single call. Unlock the simulator again with release.
	 */
	public void lock() {
		lock.lock();
	}

	/**
	 * Release the lock after a call to lock.
	 */
	public void release() {
		lock.unlock();
	}

	/**
	 * @param p
	 *            packet to send
	 * @return reply
	 * @throws IOException
	 *             if transmitting failed due to network error
	 */
	public Packet send(final Packet p) throws IOException {
		lock();
		if (!packetQueue.isEmpty()) { throw new IOException("PacketQueue contains stale data"); }
		if (!evalQueue.isEmpty()) { throw new IOException("EvalQueue contains stale data"); }
		forceNotify(new PacketSent(p));
		try {
			if (Simulator.debug) {
				System.out.println("sending: " + p);
			}
			sendLock.lock();
			try {
				implementation.send(p);
			} finally {
				sendLock.unlock();
			}
			final Packet result = packetQueue.get();
			if (Simulator.debug) {
				System.out.println("receiving: " + result);
			}
			if (!packetQueue.isEmpty()) { throw new IOException("Expected only one reply, got more"); }
			if (!evalQueue.isEmpty()) { throw new IOException("Expected no eval result; got at least one"); }
			forceNotify(new PacketReceived(result));
			return result;
		} finally {
			release();
		}
	}

	/**
	 * @param command
	 *            command to handle
	 * @param h
	 *            handler
	 */
	public void setHandler(final int command, final Handler h) {
		while (handlers.size() <= command) {
			handlers.add(null);
		}
		handlers.set(command, h);
	}

	/**
	 * @param markings
	 * @param enablings
	 * @param time
	 * @param step
	 */
	public void refreshViews(final Map<SimpleInstance, SimpleMarking> markings,
	        final Map<SimpleInstance, Boolean> enablings, final String time, final String step) {
		forceNotify(new SimulatorStateChanged(markings, enablings, time, step));
	}

	Packet handle(final Packet p) {
		try {
			final Handler h = handlers.get(p.getCommand());
			final Object result = h.handle(p.getParameters());
			if (p.getReturnType() != null && !p.getReturnType().equals(Void.class) && result != null
			        && p.getReturnType().isAssignableFrom(result.getClass())) { return new Packet(5,
			        Collections.singletonList(result)); }
		} catch (final Exception e) {
			// Ignore if we do not return normally
		}
		if (String.class.equals(p.getReturnType())) { return new Packet(5,
		        Collections.singletonList("Error in execution")); }
		if (Integer.class.equals(p.getReturnType())) { return new Packet(5, Collections.singletonList(-1)); }
		if (Boolean.class.equals(p.getReturnType())) { return new Packet(5, Collections.singletonList(false)); }
		return new Packet(5, Collections.emptyList());
	}

	Packet handleRefresh(final Packet p) {
		p.reset();
		p.getInteger(); // command = 1
		final Map<SimpleInstance, Boolean> enablings = new HashMap<SimpleInstance, Boolean>();
		final Map<SimpleInstance, SimpleMarking> markings = new HashMap<SimpleInstance, SimpleMarking>();
		@SuppressWarnings("unused")
		final int delay = p.getInteger();
		final String step = p.getString();
		final String time = p.getString();
		final int trans = p.getInteger();
		final int place = p.getInteger();
		for (int i = trans; i > 0; i--) { // trans
			final SimpleInstance t = new SimpleInstance(p.getInteger(), p.getString());
			enablings.put(t, p.getBoolean());
		}
		for (int i = place; i > 0; i--) { // place
			final SimpleInstance pp = new SimpleInstance(p.getInteger(), p.getString());
			final SimpleMarking m = new SimpleMarking(p.getInteger(), p.getString());
			markings.put(pp, m);
		}
		forceNotify(new SimulatorStateChanged(markings, enablings, step, time));
		return new Packet(5, 1);
	}
}
