package org.cpntools.accesscpn.model.exporter;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.cpntools.accesscpn.model.Arc;
import org.cpntools.accesscpn.model.Instance;
import org.cpntools.accesscpn.model.Node;
import org.cpntools.accesscpn.model.Page;
import org.cpntools.accesscpn.model.PetriNet;
import org.cpntools.accesscpn.model.PlaceNode;
import org.cpntools.accesscpn.model.TransitionNode;

public class CPNtoDot {
  
  private PetriNet net;
  
  public CPNtoDot(PetriNet net) {
    this.net = net;
  }
  
  public String toDot() {
    return toDot(new HashMap<Object, String>());
  }
  
  public String toDot(Map<Object, String> colorMap) {
    StringBuilder b = new StringBuilder();

    b.append("digraph BP {\n");

    // standard style for nodes and edges
    b.append("graph [fontname=\"Helvetica\" nodesep=0.3 ranksep=\"0.2 equally\" fontsize=10];\n");
    b.append("node [fontname=\"Helvetica\" fontsize=8 fixedsize width=\".3\" height=\".3\" label=\"\" style=filled fillcolor=white];\n");
    b.append("edge [fontname=\"Helvetica\" fontsize=8 color=white arrowhead=none weight=\"20.0\"];\n");
    b.append("\n\n");

    String tokenFillString = "fillcolor=black peripheries=2 height=\".2\" width=\".2\" ";
    
    for (Page pg : net.getPage()) {
      
      b.append("subgraph cluster_"+pg.getName().getText()+" {\n");

      // first print all places
      b.append("node [shape=circle];\n");
      for (org.cpntools.accesscpn.model.Object o : pg.getObject()) {
        if (! (o instanceof PlaceNode))
        {
          continue;
        }
        
        PlaceNode p = (PlaceNode)o;
        
        String colorString = "";
        if (!p.getInitialMarking().getText().isEmpty())
          colorString = tokenFillString;
        else if (colorMap.containsKey(p))
          colorString = "fillcolor=\""+colorMap.get(p)+"\"";
        
        b.append("  p"+p.getId()+" ["+colorString+"]\n");
        
        String auxLabel = ""; //"ROLES: "+toString(p.getRoles());
          
        b.append("  p"+p.getId()+"_l [shape=none];\n");
        b.append("  p"+p.getId()+"_l -> p"+p.getId()+" [headlabel=\""+p.getName().getText()+" "+auxLabel+"\"]\n");
      }

      // then print all events
      b.append("\n\n");
      b.append("node [shape=box];\n");
      for (org.cpntools.accesscpn.model.Object o : pg.getObject()) {
        if (! (o instanceof TransitionNode || o instanceof Instance))
        {
          continue;
        }
        
        Node t = (Node)o;

        String colorString = "";
        if (colorMap.containsKey(t))
          colorString = "fillcolor=\""+colorMap.get(t)+"\"";
        
        b.append("  t"+t.getId()+" ["+colorString+"]\n");
        
        String auxLabel  = "";  //"ROLES: "+toString(t.getRoles());
        
        b.append("  t"+t.getId()+"_l [shape=none];\n");
        b.append("  t"+t.getId()+"_l -> t"+t.getId()+" [headlabel=\""+t.getName().getText()+" "+auxLabel+"\"]\n");
      }
      
      /*
      b.append("\n\n");
      b.append(" subgraph cluster1\n");
      b.append(" {\n  ");
      for (CNode n : nodes) {
        if (n.isEvent) b.append("e"+n.localId+" e"+n.localId+"_l ");
        else b.append("c"+n.localId+" c"+n.localId+"_l ");
      }
      b.append("\n  label=\"\"\n");
      b.append(" }\n");
      */
      
      // finally, print all edges
      b.append("\n\n");
      b.append(" edge [fontname=\"Helvetica\" fontsize=8 arrowhead=normal color=black];\n");
      for (Arc arc : pg.getArc()) {
        
        String colorString = "";
        if (colorMap.containsKey(arc))
          colorString = "color=\""+colorMap.get(arc)+"\"";
        
        if (arc.getSource() instanceof TransitionNode || arc.getSource() instanceof Instance)
          b.append("  t"+arc.getSource().getId()+" -> p"+arc.getTarget().getId()+" [weight=10000.0 "+colorString+"]\n");
        else
          b.append("  p"+arc.getSource().getId()+" -> t"+arc.getTarget().getId()+" [weight=10000.0 "+colorString+"]\n");
      }
      b.append("}\n\n");
    }
    b.append("}");
    
    return b.toString();
  }
  
  public String toDot(Map<Object, String> colorMap, Map<Object, String> cluster) {
    StringBuilder b = new StringBuilder();
    
    Set<String> clusters = new HashSet<String>();
    for (String s : cluster.values())
      clusters.add(s);
    
    b.append("digraph BP {\n");

    // standard style for nodes and edges
    b.append("graph [fontname=\"Helvetica\" nodesep=0.3 ranksep=\"0.2 equally\" fontsize=10];\n");
    b.append("node [fontname=\"Helvetica\" fontsize=8 fixedsize width=\".3\" height=\".3\" label=\"\" style=filled fillcolor=white];\n");
    b.append("edge [fontname=\"Helvetica\" fontsize=8 color=white arrowhead=none weight=\"20.0\"];\n");
    b.append("\n\n");

    String tokenFillString = "fillcolor=black peripheries=2 height=\".2\" width=\".2\" ";
    
    for (String c : clusters) {

      b.append("subgraph cluster_"+c+" {\n");
      
      for (Page pg : net.getPage()) {
      
        // first print all places
        b.append("node [shape=circle];\n");
        for (org.cpntools.accesscpn.model.Object o : pg.getObject()) {
          if (! (o instanceof PlaceNode))
          {
            continue;
          }
          if (cluster.get(o) == null) continue;
          if (!cluster.get(o).equals(c)) continue;
          
          PlaceNode p = (PlaceNode)o;
          
          String colorString = "";
          if (!p.getInitialMarking().getText().isEmpty())
            colorString = tokenFillString;
          else if (colorMap.containsKey(p))
            colorString = "fillcolor=\""+colorMap.get(p)+"\"";
          
          b.append("  p"+p.getId()+" ["+colorString+"]\n");
          
          String auxLabel = ""; //"ROLES: "+toString(p.getRoles());
            
          b.append("  p"+p.getId()+"_l [shape=none];\n");
          b.append("  p"+p.getId()+"_l -> p"+p.getId()+" [headlabel=\""+p.getName().getText()+" "+auxLabel+"\"]\n");
        }
  
        // then print all events
        b.append("\n\n");
        b.append("node [shape=box];\n");
        for (org.cpntools.accesscpn.model.Object o : pg.getObject()) {
          if (! (o instanceof TransitionNode || o instanceof Instance))
          {
            continue;
          }
          if (cluster.get(o) == null) continue;
          if (!cluster.get(o).equals(c)) continue;
          
          Node t = (Node)o;
  
          String colorString = "";
          if (colorMap.containsKey(t))
            colorString = "fillcolor=\""+colorMap.get(t)+"\"";
          
          b.append("  t"+t.getId()+" ["+colorString+"]\n");
          
          String auxLabel  = "";  //"ROLES: "+toString(t.getRoles());
          
          b.append("  t"+t.getId()+"_l [shape=none];\n");
          b.append("  t"+t.getId()+"_l -> t"+t.getId()+" [headlabel=\""+t.getName().getText()+" "+auxLabel+"\"]\n");
        }
        
        // finally, print all edges
        b.append("\n\n");
        b.append(" edge [fontname=\"Helvetica\" fontsize=8 arrowhead=normal color=black];\n");
        for (Arc arc : pg.getArc()) {
          
          if (cluster.get(arc.getSource()) == null) continue;
          if (!cluster.get(arc.getSource()).equals(c)) continue;
          if (cluster.get(arc.getTarget()) == null) continue;
          if (!cluster.get(arc.getTarget()).equals(c)) continue;
          
          String colorString = "";
          if (colorMap.containsKey(arc))
            colorString = "color=\""+colorMap.get(arc)+"\"";
          
          if (arc.getSource() instanceof TransitionNode || arc.getSource() instanceof Instance)
            b.append("  t"+arc.getSource().getId()+" -> p"+arc.getTarget().getId()+" [weight=10000.0 "+colorString+"]\n");
          else
            b.append("  p"+arc.getSource().getId()+" -> t"+arc.getTarget().getId()+" [weight=10000.0 "+colorString+"]\n");
        }
      }
      b.append("}\n\n");
    }
    
    {
      for (Page pg : net.getPage()) {
        
        // first print all places
        b.append("node [shape=circle];\n");
        for (org.cpntools.accesscpn.model.Object o : pg.getObject()) {
          if (! (o instanceof PlaceNode))
          {
            continue;
          }
          if (cluster.get(o) != null) continue;
          
          PlaceNode p = (PlaceNode)o;
          
          String colorString = "";
          if (!p.getInitialMarking().getText().isEmpty())
            colorString = tokenFillString;
          else if (colorMap.containsKey(p))
            colorString = "fillcolor=\""+colorMap.get(p)+"\"";
          
          b.append("  p"+p.getId()+" ["+colorString+"]\n");
          
          String auxLabel = ""; //"ROLES: "+toString(p.getRoles());
            
          b.append("  p"+p.getId()+"_l [shape=none];\n");
          b.append("  p"+p.getId()+"_l -> p"+p.getId()+" [headlabel=\""+p.getName().getText()+" "+auxLabel+"\"]\n");
        }
  
        // then print all events
        b.append("\n\n");
        b.append("node [shape=box];\n");
        for (org.cpntools.accesscpn.model.Object o : pg.getObject()) {
          if (! (o instanceof TransitionNode || o instanceof Instance))
          {
            continue;
          }
          if (cluster.get(o) != null) continue;
          
          Node t = (Node)o;
  
          String colorString = "";
          if (colorMap.containsKey(t))
            colorString = "fillcolor=\""+colorMap.get(t)+"\"";
          
          b.append("  t"+t.getId()+" ["+colorString+"]\n");
          
          String auxLabel  = "";  //"ROLES: "+toString(t.getRoles());
          
          b.append("  t"+t.getId()+"_l [shape=none];\n");
          b.append("  t"+t.getId()+"_l -> t"+t.getId()+" [headlabel=\""+t.getName().getText()+" "+auxLabel+"\"]\n");
        }
        
        // finally, print all edges
        b.append("\n\n");
        b.append(" edge [fontname=\"Helvetica\" fontsize=8 arrowhead=normal color=black];\n");
        for (Arc arc : pg.getArc()) {
          
          if (cluster.get(arc.getSource()) == cluster.get(arc.getTarget())
              && cluster.get(arc.getSource()) != null) continue;
          
          String colorString = "";
          if (colorMap.containsKey(arc))
            colorString = "color=\""+colorMap.get(arc)+"\"";
          
          if (arc.getSource() instanceof TransitionNode || arc.getSource() instanceof Instance)
            b.append("  t"+arc.getSource().getId()+" -> p"+arc.getTarget().getId()+" [weight=10000.0 "+colorString+"]\n");
          else
            b.append("  p"+arc.getSource().getId()+" -> t"+arc.getTarget().getId()+" [weight=10000.0 "+colorString+"]\n");
        }
      }
    }

    b.append("}");
    
    return b.toString();
  }

}
