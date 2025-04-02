"use client";

import Image from "next/image";
import type { Entry } from "./guestbook-container";

interface GuestbookEntriesProps {
  entries: Entry[];
}

export default function GuestbookEntries({ entries }: GuestbookEntriesProps) {
  return (
    <div className="space-y-6 max-w-md mx-auto">
      <h2 className="text-2xl font-normal text-center text-black">Memories</h2>
      <hr className="border-t border-black my-4" />
      {entries.length === 0 ? (
        <p className="text-center text-black">
          No memories yet. Be the first to leave one!
        </p>
      ) : (
        entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white p-4 border border-black rounded-xl"
          >
            <p className="font-bold text-black">{entry.name}</p>
            <p className="text-black">{entry.message}</p>
            <div className="mt-4 space-y-4">
              {entry.photo && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Photo:</p>
                  <Image
                    src={entry.photo}
                    alt="User photo"
                    width={300}
                    height={200}
                    className="border border-black rounded-xl"
                  />
                </div>
              )}
              {entry.drawing &&
                entry.drawing !==
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADICAYAAABS39xVAAAAAXNSR0IArs4c6QAABGJJREFUeF7t1AEJAAAMAsHZv/RyPNwSyDncOQIECEQEFskpJgECBM5geQICBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEHnESADwK+BDlAAAAAElFTkSuQmCC" && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Drawing:</p>
                    <Image
                      src={entry.drawing}
                      alt="User drawing"
                      width={300}
                      height={200}
                      className="border border-black rounded-xl"
                    />
                  </div>
                )}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {new Date(entry.timestamp).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
