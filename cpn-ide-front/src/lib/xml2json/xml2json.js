/*	This work is licensed under Creative Commons GNU LGPL License.

  License: http://creativecommons.org/licenses/LGPL/2.1/
  Version: 0.9
	Author:  Stefan Goessner/2006
	Web:     http://goessner.net/
*/
export function xml2json(xml, tab) {
  var X = {

    toObj: function (xml) {
      // console.log('xml2json(), xml.nodeName = ', xml.nodeName);

      var obj = { tag: xml.nodeName, children: [] };

      if (xml.nodeType == 1) {   // element node ..
        if (xml.attributes.length)   // element with attributes  ..
          for (var i = 0; i < xml.attributes.length; i++)
            obj["@" + xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue || "").toString();

        if (xml.firstChild) { // element has child nodes ..
          var textChild = 0, cdataChild = 0, hasElementChild = false;
          for (var n = xml.firstChild; n; n = n.nextSibling) {
            if (n.nodeType == 1) hasElementChild = true;
            else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/))
              textChild++; // non-whitespace text
            else if (n.nodeType == 4)
              cdataChild++; // cdata section node
          }

          if (hasElementChild) {
            if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
              X.removeWhite(xml);
              for (var n = xml.firstChild; n; n = n.nextSibling) {
                if (n.nodeType == 3)  // text node
                  obj["#text"] = X.escape(n.nodeValue);
                else if (n.nodeType == 4)  // cdata node
                  obj["#cdata"] = X.escape(n.nodeValue);
                // else if (obj.children[n.nodeName]) {  // multiple occurence of element ..
                  // if (obj.children[n.nodeName] instanceof Array)
                  //   obj.children[n.nodeName][obj.children[n.nodeName].length] = X.toObj(n);
                  // else
                  //   obj.children[n.nodeName] = [obj.children[n.nodeName], X.toObj(n)];
                // }
                // else  // first occurence of element..
                //   obj.children[n.nodeName] = X.toObj(n);

                else
                // obj.children = X.toObj(n);
                  obj.children.push(X.toObj(n));
              }
            }

            else { // mixed children
              if (!xml.attributes.length)
                obj.children = X.escape(X.innerXml(xml));
              else
                obj.children["#text"] = X.escape(X.innerXml(xml));
            }
          }

          else if (textChild) { // pure text
            if (!xml.attributes.length)
              obj.text = X.escape(X.innerXml(xml));
            else
              obj["#text"] = X.escape(X.innerXml(xml));
          }
          else if (cdataChild) { // cdata
            if (cdataChild > 1)
              obj = X.escape(X.innerXml(xml));
            else
              for (var n = xml.firstChild; n; n = n.nextSibling)
                obj["#cdata"] = X.escape(n.nodeValue);
          }
        }
        if (!xml.attributes.length && !xml.firstChild)
          obj = null;
      }
      else if (xml.nodeType == 9) { // document.node
        obj.documentElement = X.toObj(xml.documentElement);
      }
      else
        alert("unhandled node type: " + xml.nodeType);

      console.log('xml2json(), xml.nodeName = ', xml.nodeName, ', obj = ', obj);

      return obj;
    },

    toJson: function (_obj, name, ind) {

      var obj = _obj && _obj.children || null;

      var json = ""; // name ? ("\"" + name + "\"") : "";
      if (obj instanceof Array) {
        for (var i = 0, n = obj.length; i < n; i++)
          obj[i] = X.toJson(obj[i], "", ind + "\t");
        json += (name ? "" : "[") + (obj.length > 1 ? ("\n" + ind + "\t" + obj.join(",\n" + ind + "\t") + "\n" + ind) : obj.join("")) + "]";
      }
      // else
      // if (obj == null)
      //   json += (name && ":") + "null";
      // else if (typeof (obj) == "object") {
      //   var arr = [];
      //   for (var m in obj)
      //     arr[arr.length] = X.toJson(obj[m], m, ind + "\t");
      //   json += (name ? "" : "{") + (arr.length > 1 ? ("\n" + ind + "\t" + arr.join(",\n" + ind + "\t") + "\n" + ind) : arr.join("")); // + "}";
      // }
      // else if (typeof (obj) == "string")
      //   json += (name && ":") + "\"" + obj.toString() + "\"";
      // else
      //   json += (name && ":") + obj.toString();

      // return json;
      return "{ tag: '" + name + "', children: " + json + " }";
    },

    innerXml: function (node) {
      var s = ""
      if ("innerHTML" in node)
        s = node.innerHTML;
      else {
        var asXml = function (n) {
          var s = "";
          if (n.nodeType == 1) {
            s += "<" + n.nodeName;
            for (var i = 0; i < n.attributes.length; i++)
              s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue || "").toString() + "\"";
            if (n.firstChild) {
              s += ">";
              for (var c = n.firstChild; c; c = c.nextSibling)
                s += asXml(c);
              s += "</" + n.nodeName + ">";
            }
            else
              s += "/>";
          }
          else if (n.nodeType == 3)
            s += n.nodeValue;
          else if (n.nodeType == 4)
            s += "<![CDATA[" + n.nodeValue + "]]>";
          return s;
        };
        for (var c = node.firstChild; c; c = c.nextSibling)
          s += asXml(c);
      }
      return s;
    },
    escape: function (txt) {
      return txt.replace(/[\\]/g, "\\\\")
        .replace(/[\"]/g, '\\"')
        .replace(/[\n]/g, '\\n')
        .replace(/[\r]/g, '\\r');
    },
    removeWhite: function (e) {
      e.normalize();
      for (var n = e.firstChild; n;) {
        if (n.nodeType == 3) {  // text node
          if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
            var nxt = n.nextSibling;
            e.removeChild(n);
            n = nxt;
          }
          else
            n = n.nextSibling;
        }
        else if (n.nodeType == 1) {  // element node
          X.removeWhite(n);
          n = n.nextSibling;
        }
        else                      // any other node
          n = n.nextSibling;
      }
      return e;
    }
  };
  if (xml.nodeType == 9) // document node
    xml = xml.documentElement;

  var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
  return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
}
